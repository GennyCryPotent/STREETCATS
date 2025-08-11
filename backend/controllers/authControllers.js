import {User} from '../models/database.js';  
import bcrypt from 'bcrypt';   
import Jwt from 'jsonwebtoken';


export class AuthController {
    /**
     * Handles post requests on /auth. Checks that the given credentials are valid
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    static async checkCredentials(req, res) {
        const user = await User.findOne({ where: { username: req.body.username } });
        
        if (!user) return null;

        const match = await bcrypt.compare(req.body.password, user.password);
        return match ? user : null;
    }

    
    static async saveUser(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    return User.create({
        username: req.body.username,
        password: hashedPassword
    });
    }

    static issueToken(user) {
        const payload = { id: user.id, username: user.username };
        return Jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    }


    static isTokenValid(token, callback){
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }

}