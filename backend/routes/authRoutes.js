import express from 'express';
import { AuthController } from '../controllers/authControllers.js';

export const authenticationRouter = express.Router();

// This route handles user authentication
authenticationRouter.post('/', async (req, res) => {
    const user = await AuthController.checkCredentials(req, res);
    if (user) {
        const token = AuthController.issueToken(user); // pass full user object
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials. Try again." });
    }
});

// This route handles user signup
authenticationRouter.post('/signup', async (req, res, next) => {
    try {
        const user = await AuthController.saveUser(req, res);
        res.json(user);
    } catch (error) {
        next(error) // Pass the error to the error handler middleware
    }
});