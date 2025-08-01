import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import database from './models/database.js';
import { populateDatabase } from './initDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { PostController } from './controllers/postControllers.js';

//routes
import { postRouter } from './routes/postRoutes.js';
import { commentRouter } from './routes/commentRoutes.js';
import { authenticationRouter } from './routes/authRoutes.js';

const app = express();

// Generic Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//Connecting Database
try {
  await database.authenticate(); //autenthication
  await database.sync({ force: true }); //sync models
 
  await populateDatabase(); //populating database with initial data

  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Routes
app.use('/auth', authenticationRouter);
app.use('/posts', postRouter);
app.use('/posts', commentRouter);
app.get('/', async (req, res, next) => {
    try {
        const posts = await PostController.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${process.env.PORT}`);
});


