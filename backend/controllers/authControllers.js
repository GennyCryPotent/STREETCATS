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
        const user = await User.findOne({ where: { username: req.body.usr } });

        if (!user) return false;

        const passwordMatch = await bcrypt.compare(req.body.pwd, user.password);
        return passwordMatch;
    }

    

    static async saveUser(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.pwd, 10); 
    return User.create({
        username: req.body.usr,
        password: hashedPassword
    });
    }

    static issueToken(username){
        return Jwt.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
    }

    static isTokenValid(token, callback){
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }

}