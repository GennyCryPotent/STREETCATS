import express from 'express';
import { AuthController } from '../controllers/AuthController.js';

export const authenticationRouter = express.Router();

// This route handles user authentication
authenticationRouter.post('/auth', async (req, res) => {
    let isAuthenticated = await AuthController.checkCredentials(req, res); //check if the user credentials are valid
    if(isAuthenticated){
        res.json(AuthController.issueToken(req.body.usr)); //issue a token if the credentials are valid
    }
    else{
        res.status(401);
        res.json( {error: "Invalid credentials. Try again."});
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