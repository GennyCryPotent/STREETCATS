import { Post, Comment } from '../models/database.js';

/**
 * This middleware ensures that the user is currently authenticated. If not,
 * redirects to login with an error message.
 */

// This middleware checks if the user is authenticated and has permission to modify a specific todo item.
export function enforceAuthentication(req, res, next){
    if (req.session && req.session.auth) {
        // Attach user info to request object for downstream middleware/routes
        req.user = {
            id: req.session.userId,
            username: req.session.username
        };
        next();
    } else {
        next({ status: 401, message: "Unauthorized" });
    }
}

// This middleware checks if the user has permission to modify a specific comment.
export async function ensureUserOwnsComment(req, res, next){
    try {
        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
           return next({ status: 404, message: "Commento non trovato" });
        }

        if (comment.userId !== req.session.userId) {
            return next({ status: 403, message: "Non hai il permesso per modifcare il commento" });
        }

        next();
    } catch (err) {
        next(err);
    }
}

// This middleware checks if the user has permission to modify a specific post.
export async function ensureUserOwnsPost(req, res, next){
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if (!post) {
            return next({ status: 404, message: "Post non trovato" });
        }   
        if (post.userId !== req.session.userId) {
            return next({ status: 403, message: "Non hai il permesso per modifcare il post" });
        }

        next();
    } catch (err) {
        next(err);
    }
}
