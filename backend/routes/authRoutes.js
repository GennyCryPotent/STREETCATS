import express from 'express';
import { AuthController } from '../controllers/authControllers.js';

export const authenticationRouter = express.Router();

// This route handles user authentication
authenticationRouter.post('/', async (req, res, next) => {
    try {
        const user = await AuthController.checkCredentials(req, res);
        if (user) {
            // save user info in session
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.auth = true;

            res.status(200).json({
                message: "Login effettuato con successo",
                user: { id: user.id, username: user.username }
            });
        } else {
            res.status(401).json({ error: "Credenziali non valide. Riprova." });
        }
    } catch (error) {
        next(error);
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

// This route checks if the user is logged in
authenticationRouter.get('/session', (req, res) => {
if (req.session && req.session.auth) { // Check if session exists and user is authenticated
        res.json({
            loggedIn: true,
            user: {
                id: req.session.userId,
                username: req.session.username
            }
        });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// This route handles user logout
authenticationRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Errore nel logout" });
    res.clearCookie('connect.sid'); 
    res.json({ message: "Logout effettuato" });
  });
});
