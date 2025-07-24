import express from 'express';
import {CommentController} from '../controllers/commentControllers.js';
import { enforceAuthentication, ensureUserOwnsComment } from '../middleware/authorization.js';

export const commentRouter = express.Router();

commentRouter.get('/', async (req, res, next) => {
    try {
        const comments = await CommentController.getCommentsByPostId(req);
        res.status(200).json(comments);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});


commentRouter.post('/', enforceAuthentication, async (req, res, next) =>{

    try{
        const comment = await CommentController.createComment(req);
        res.status(201).json(comment);
    }
    catch(error){
        next(error); // Pass the error to the error handler middleware
    }
});

commentRouter.delete('/:id', enforceAuthentication, ensureUserOwnsComment, async (req, res, next)=>{
    try{
        const comment = await CommentController.deleteComment(req);
        res.status(201).json(comment);
    }
    catch(error){
        next(error); // Pass the error to the error handler middleware
    }
});

commentRouter.put('/:id', enforceAuthentication, ensureUserOwnsComment, async (req, res, next)=>{
    try{
        const comment = await CommentController.updateComment(req);
        res.status(201).json(comment);
    }
    catch(error){
        next(error); // Pass the error to the error handler middleware
    }
});
