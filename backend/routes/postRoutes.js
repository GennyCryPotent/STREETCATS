import express from 'express';
import {PostController} from '../controllers/postControllers.js';
import { enforceAuthentication, ensureUserOwnsPost } from '../middleware/authorization.js';
import { uploadImage } from '../middleware/uploads.js';
import multer from 'multer';

export const postRouter = express.Router();

postRouter.get('/:id', async (req, res, next) => {
    try {
        const post = await PostController.getPostById(req);
        res.status(200).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});


postRouter.post("/new", enforceAuthentication, async (req, res, next) => {
    try {
        const post = await PostController.createPost(req);
        res.status(201).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

postRouter.delete('/:id', enforceAuthentication, ensureUserOwnsPost, async (req, res, next) => {
    try {
        const post = await PostController.deletePost(req);
        res.status(200).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

postRouter.put('/:id', enforceAuthentication, ensureUserOwnsPost, async (req, res, next) => {
    try {
        const post = await PostController.updatePost(req);
        res.status(200).json(post);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

postRouter.post('/uploadImage', enforceAuthentication, uploadImage, (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Inserisci una immagine valida (solo .jpg, .jpeg, .png)' });
    }
    res.status(200).json({ filename: `/uploads/${req.file.filename}` });
});

// Gestione degli errori di Multer
postRouter.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Errore durante il caricamento dell\'immagine' });
    } else if (err.message === 'Only images are allowed') {
        return res.status(400).json({ error: 'Inserisci una immagine valida (solo .jpg, .jpeg, .png)' });
    }
    next(err);
});