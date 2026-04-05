import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkgPg from 'pg';
import dotenv from 'dotenv';
import passport from 'passport'; 
import GoogleStrategyPkg from 'passport-google-oauth20'; 
import session from 'express-session'; 
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const { Pool } = pkgPg;
const GoogleStrategy = GoogleStrategyPkg.Strategy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "sandbox.smtp.mailtrap.io",
  port: process.env.EMAIL_PORT || 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- MIDDLEWARE ---
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'orange_innovator_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// --- GOOGLE OAUTH STRATEGY ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findUnique({ where: { email: profile.emails[0].value } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            fullName: profile.displayName,
            fatherName: "Google Provider",
            username: profile.emails[0].value.split('@')[0] + Math.floor(Math.random() * 1000),
            email: profile.emails[0].value,
            phone: "N/A",
            country: "Global",
            city: "Online",
            password: "", // OAuth users don't have a local password
          }
        });
      }
      return done(null, user);
    } catch (err) { return done(err, null); }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

// --- ZOD SCHEMAS ---
const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  fatherName: z.string().min(3, "Father's name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email").refine((val) => val.endsWith("@gmail.com"), {
    message: "Only @gmail.com addresses are allowed",
  }),
  phone: z.string().regex(/^\+\d{1,3}\d{8}$/, "Must start with + and have 8 digits after country code"),
  country: z.string().min(1, "Please select a country"),
  birthDate: z.string().min(1, "Birthday is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});

// --- ROUTES ---

// 1. Google OAuth
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5174/login' }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`http://localhost:5174/welcome?token=${token}`);
  }
);

// 2. Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const validated = signupSchema.parse(req.body);
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username: validated.username }, { email: validated.email }] }
    });

    if (existingUser) {
      const field = existingUser.username === validated.username ? "Username" : "Email";
      return res.status(409).json({ error: `${field} is already taken!` });
    }

    const hashedPassword = await bcrypt.hash(validated.password, 12);
    const user = await prisma.user.create({
      data: {
        ...validated,
        birthDate: new Date(validated.birthDate),
        password: hashedPassword,
        city: "N/A"
      }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: "Account created successfully!", token });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 3. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// 4. Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Checking email for:", email); // Log 1

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("User not found in DB");
      return res.status(200).json({ message: "If an account exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 3600000); 

    await prisma.user.update({
      where: { email },
      data: { resetPasswordToken: resetToken, resetPasswordExpires: resetExpiry }
    });
    console.log("DB updated with token"); // Log 2

    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;

    console.log("Attempting to send email via Mailtrap..."); // Log 3
    await transporter.sendMail({
      from: '"Alif Support" <support@alif.com>',
      to: user.email,
      subject: "Password Reset Request",
      html: `<h3>Reset your password</h3><p>Click <a href="${resetUrl}">here</a> to reset. Valid for 1 hour.</p>`
    });

    console.log("Email sent successfully!"); // Log 4
    res.status(200).json({ message: "Reset link sent!" });

  } catch (error) {
    // THIS IS THE MOST IMPORTANT PART:
    console.error("CRITICAL ERROR IN FORGOT-PASSWORD:", error); 
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});
// 5. Reset Password
app.post('/api/auth/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await prisma.user.findFirst({
      where: { resetPasswordToken: token, resetPasswordExpires: { gt: new Date() } }
    });

    if (!user) return res.status(400).json({ message: "Token is invalid or has expired" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test route
app.get('/', (req, res) => res.send("Alif Innovators API is running!"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import passport from 'passport';

// import './src/config/passport.js'; // Initialize passport config
// import authRoutes from './src/routes/authRoutes.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(helmet());
// app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
// app.use(express.json());
// app.use(morgan('dev'));
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'secret',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => res.send("Alif Innovators API is running!"));

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));