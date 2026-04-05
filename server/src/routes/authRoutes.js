import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController.js';
import { validateSignup } from '../middleware/validate.js';

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5174/login' }),
  authController.googleCallback 
);

// Standard Auth
router.post('/signup', validateSignup, authController.signup);
router.post('/login', authController.login);a
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

export default router;