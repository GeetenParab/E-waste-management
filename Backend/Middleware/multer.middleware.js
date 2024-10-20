import multer from "multer";
import User from "../Models/User.model.js";
import path from "path";
import { fileURLToPath } from 'url';

// Get the current file's path
const __filename = fileURLToPath(import.meta.url);

// Get the directory of the current file
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { username } = req.body;

    // Check if a user with the given username exists
    const existedUser = await User.findOne({ username });

    // console.log(existedUser); // For debugging purposes

    if (existedUser) {
      // If user already exists, throw an error
      const error = new Error('User with the provided username already exists');
      error.code = 'USER_ALREADY_EXISTS';
      cb(error, null); // Passing the error to Multer
    } else {
      // Construct the absolute path for destination
      const destinationPath = path.join(__dirname, "..", "public");

      cb(null, destinationPath);
    }
  },
  filename: function (req, file, cb) {
    // Use the original filename for the uploaded file
    // console.log(file)
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
