import {User} from '../models/user.js';     

export class AuthController {
    /**
     * Handles post requests on /auth. Checks that the given credentials are valid
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    static async checkCredentials(req, res) {
        let user = User.build({ //build a new user object
            username: req.body.usr, 
            password: req.body.pwd
        });

        let found = await User.findOne({
            where: {
                username: user.username,
                password: user.password 
            }
        });

         return found !== null;
    }

    static async saveUser(req, res){

        let user = new User({
            username: req.body.usr, 
            password: req.body.pwd
        });

        return user.save();
    }

    static issueToken(username){
        return Jwt.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
    }

    static isTokenValid(token, callback){
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }

}