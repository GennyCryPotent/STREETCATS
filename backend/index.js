import express from 'express';
import cors from 'cors';
//import routes from './routes/index.js';
import database from './models/database.js';
import { populateDatabase } from './initDB.js';

const app = express();
app.use(cors());
app.use(express.json());
//app.use('/api', routes);

try {
  await database.authenticate(); //autenthication
  await database.sync({ force: true }); //sync models
 
  await populateDatabase(); //populating database with initial data

  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  }

app.listen(3000, () => {
  console.log("Server avviato su http://localhost:3000");
});


