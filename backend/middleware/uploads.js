
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext; // Create a unique filename using timestamp and random number
    cb(null, uniqueName); 
  }
});

export const uploadImage = multer({ storage }).single('image');
