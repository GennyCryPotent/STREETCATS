import express from 'express';
import { CommentController } from '../controllers/commentControllers.js';
import { enforceAuthentication, ensureUserOwnsComment } from '../middleware/authorization.js';

export const commentRouter = express.Router();

// Get all comments for a specific post
commentRouter.get('/:postId/comments', async (req, res, next) => {
    try {
        const comments = await CommentController.getCommentsByPostId(req);
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
});

// Create a comment for a specific post
commentRouter.post('/:postId/comments', enforceAuthentication, async (req, res, next) => {
    try {
        req.body.postId = req.params.postId; 
        const comment = await CommentController.createComment(req);
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

// Delete a comment
commentRouter.delete('/comments/:id', enforceAuthentication, ensureUserOwnsComment, async (req, res, next) => {
    try {
        const comment = await CommentController.deleteComment(req);
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

// Update a comment
commentRouter.put('/comments/:id', enforceAuthentication, ensureUserOwnsComment, async (req, res, next) => {
    try {
        const comment = await CommentController.updateComment(req);
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});
