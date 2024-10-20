import  express  from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "../Models/Admin.model.js";
import authenticateAdmin from './../Middleware/AdminAuthorization.js';
import Ewaste from "../Models/Ewaste.model.js"

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate a token with 'admin' role
    const token = jwt.sign(
      { _id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const ewasteItems = await Ewaste.find()
      .populate('owner', 'fullName') // Populate the 'owner' field, selecting only the 'fullName'
      .exec();

    res.status(200).json(ewasteItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
});

router.put('/update-status/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Status will be passed in the request body (e.g., 'accepted', 'rejected', 'pending')

  try {
    // Validate status input
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the e-waste item by ID and update the status
    const ewasteItem = await Ewaste.findByIdAndUpdate(
      id,
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    // If the e-waste item is not found
    if (!ewasteItem) {
      return res.status(404).json({ message: 'E-waste item not found' });
    }

    // Respond with the updated e-waste item
    res.status(200).json({ message: 'Status updated successfully', ewasteItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;