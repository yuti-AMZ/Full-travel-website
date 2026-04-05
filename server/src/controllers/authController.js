import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../config/db.js';
import { transporter } from '../config/mailer.js';
import { signupSchema } from '../schemas/authSchemas.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// --- 1. Signup ---
export const signup = async (req, res) => {
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
    res.status(400).json({ error: error.message || "Signup failed" });
  }
};

// --- 2. Login ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ 
      token, 
      user: { id: user.id, username: user.username, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- 3. Google OAuth Callback ---
export const googleCallback = (req, res) => {
  // Passport attaches the user to req.user after a successful login
  const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: '7d' });
  // Redirect back to your frontend with the token in the URL
  res.redirect(`http://localhost:5174/welcome?token=${token}`);
};

// --- 4. Forgot Password ---
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    // For security, don't tell the user if the email doesn't exist
    if (!user) {
      return res.status(200).json({ message: "If an account exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: { resetPasswordToken: resetToken, resetPasswordExpires: resetExpiry }
    });

    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: '"Alif Support" <support@alif.com>',
      to: user.email,
      subject: "Password Reset Request",
      html: `<h3>Reset your password</h3><p>Click <a href="${resetUrl}">here</a> to reset. Valid for 1 hour.</p>`
    });

    res.status(200).json({ message: "Reset link sent!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send reset email." });
  }
};

// --- 5. Reset Password ---
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user with valid token and expiration in the future
    const user = await prisma.user.findFirst({
      where: { 
        resetPasswordToken: token, 
        resetPasswordExpires: { gt: new Date() } 
      }
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
};