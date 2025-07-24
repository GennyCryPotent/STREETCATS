import { AuthController } from "../controllers/authControllers.js";

/**
 * This middleware ensures that the user is currently authenticated. If not,
 * redirects to login with an error message.
 */

// This middleware checks if the user is authenticated and has permission to modify a specific todo item.
export function enforceAuthentication(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1];
    if(!token){
        next({status: 401, message: "Unauthorized"});
        return;
    }
    AuthController.isTokenValid(token, (err, decodedToken) => {
        if(err){
            next({status: 401, message: "Unauthorized"});
        } 
        else {
            req.user = decodedToken;
            next();
        }
    });
}

// This middleware checks if the user has permission to modify a specific comment.
export async function ensureUserOwnsComment(req, res, next){
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);
    if (comment && comment.userId === req.user.id) {
        next();
    } else {
        next({ status: 403, message: "Forbidden" });
    }
}

// This middleware checks if the user has permission to modify a specific post.
export async function ensureUserOwnsPost(req, res, next){
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (post && post.userId === req.user.id) {
        next();
    } else {
        next({ status: 403, message: "Forbidden" });
    }
}
