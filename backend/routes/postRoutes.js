import express from 'express';
import {PostController} from '../controllers/postControllers.js';
import { enforceAuthentication, ensureUserOwnsPost } from '../middleware/authorization.js';

export const postRouter = express.Router();

postRouter.get('/', async (req, res, next) => {
    try {
        const posts = await PostController.getAllPosts(req);
        res.status(200).json(posts);
    } catch (error) {
       next(error); // Pass the error to the error handler middleware
    }
});


postRouter.get('/posts/:id', async (req, res, next) => {
    try {
        const post = await PostController.getPostById(req);
        res.status(200).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});


postRouter.post("/posts", enforceAuthentication, async (req, res, next) => {
    try {
        const post = await PostController.createPost(req);
        res.status(201).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

postRouter.delete('/posts/:id', enforceAuthentication, ensureUserOwnsPost, async (req, res, next) => {
    try {
        const post = await PostController.deletePost(req);
        res.status(200).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

postRouter.put('/posts/:id', enforceAuthentication, ensureUserOwnsPost, async (req, res, next) => {
    try {
        const post = await PostController.updatePost(req);
        res.status(200).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});
