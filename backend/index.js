import fs from 'fs';
import dotenv from 'dotenv';
import session from 'express-session';
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

//upload file env
if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
  console.log('Caricato file .env');
} else {
  dotenv.config({ path: '.env.dummy' });
  console.log('Nessun file .env trovato, uso .env.dummy');
}

//config session
app.use(session({
  secret: process.env.SESSION_SECRET || 'cats_secret', 
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true, 
    secure: false 
  }
}));

// Generic Middleware
app.use(cors( //use cors to allow requests from frontend
  {
  origin: 'http://localhost:4200', 
  credentials: true // Allow session cookie from browser to pass through
}
));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//Connecting Database
try {
  await database.authenticate(); //autenthication
  await database.sync({ force: true }); //sync models
 
  await populateDatabase(); //populating database with initial data for testing

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
  console.log(`Server avviato su http://localhost:${PORT}`);
});


