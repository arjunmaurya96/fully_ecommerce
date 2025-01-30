import { authController } from "../controllers/authController.js"; 
import { googleAuthController } from "../controllers/googleAuthController.js";
import { Router } from "express";

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Add the Google OAuth routes
router.get('/googleAuth', googleAuthController.googleAuth); // Route for initiating OAuth
router.get('/google/callback', googleAuthController.googleCallback); // OAuth callback route






//router.post('/protected', authController.protectedRoute);

export default router; 