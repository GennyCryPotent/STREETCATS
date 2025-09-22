import {User} from '../models/database.js';  
import bcrypt from 'bcrypt';   


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

    

}