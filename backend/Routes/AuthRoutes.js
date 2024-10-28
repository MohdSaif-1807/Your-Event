import express from 'express';
import { googleAuth, googleAuthCallback, loginSuccess, logout } from '../Controllers/AuthController.js';
import passport from 'passport';

export const AuthRoutes = express.Router();

AuthRoutes.get('/auth/google', googleAuth);
AuthRoutes.get('/auth/google/callback', googleAuthCallback);
AuthRoutes.get('/login/success', loginSuccess);
AuthRoutes.get('/logout', logout);
