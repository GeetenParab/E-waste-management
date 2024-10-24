import  express  from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "../Models/Admin.model.js";
import authenticateAdmin from './../Middleware/AdminAuthorization.js';
import Ewaste from "../Models/Ewaste.model.js"
import nodemailer from 'nodemailer';

const router = express.Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'PLAIN',
    user:"geeten2301@gmail.com", // your Gmail address
    pass:"onqfnrwvaueebyow"  // your Gmail app password
  }
});

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
  const { status } = req.body;

  try {
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ewasteItem = await Ewaste.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('owner', 'email fullName');

    if (!ewasteItem) {
      return res.status(404).json({ message: 'E-waste item not found' });
    }

    // Send email notification if status is 'accepted' or 'rejected'
    if (['accepted', 'rejected'].includes(status)) {
      try {
        const subject = status === 'accepted' 
          ? 'E-waste Request Accepted' 
          : 'E-waste Request Status Update';

        const message = status === 'accepted'
          ? `Dear ${ewasteItem.owner.fullName},\n\nYour e-waste request has been accepted. Our team will contact you soon for pickup.\n\nBest regards,\nE-waste Management Team`
          : `Dear ${ewasteItem.owner.fullName},\n\nYour e-waste request has been reviewed and requires additional information. Please contact our support team.\n\nBest regards,\nE-waste Management Team`;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: ewasteItem.owner.email,
          subject: subject,
          text: message
        });

        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        return res.status(200).json({
          message: 'Status updated successfully, but email notification failed',
          ewasteItem,
          emailError: emailError.message
        });
      }
    }

    res.status(200).json({
      message: 'Status updated successfully',
      ewasteItem
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      message: 'Server error',
      details: error.message
    });
  }
});

const eWasteCategories = {
  'Refrigerator': {
    co2EmissionFactor: 1.4// kg of CO₂ per kg of Refrigerator
  },
  'Television': {
    co2EmissionFactor: 1.2 // kg of CO₂ per kg of Television
  },
  'Smartphone': {
    co2EmissionFactor: 0.7 // kg of CO₂ per kg of Smartphone
  },
  'Laptop': {
    co2EmissionFactor: 1.0 // kg of CO₂ per kg of Laptop
  },
  'Desktop Computer': {
    co2EmissionFactor: 1.0 // kg of CO₂ per kg of Desktop Computer
  },
  'Printer': {
    co2EmissionFactor: 0.4 // kg of CO₂ per kg of Printer
  },
  'Microwave': {
    co2EmissionFactor: 1.0 // kg of CO₂ per kg of Microwave
  },
  'Other': {
    co2EmissionFactor: 1.2 // kg of CO₂ per kg of other e-waste
  }
};

router.get('/dashboard/report', authenticateAdmin, async (req, res) => {
  try {
    const ewasteItems = await Ewaste.find().populate('owner', 'fullName').exec();

    const acceptedRequests = ewasteItems.filter(item => item.status === 'accepted');

    // Calculate total accepted weight and carbon footprint based on CO₂ emission factors
    let totalAcceptedWeight = 0;
    let carbonFootprint = 0;

    acceptedRequests.forEach(item => {
      totalAcceptedWeight += item.weight;

      // Look up the CO₂ emission factor based on the item's name
      const category = eWasteCategories[item.itemName] || eWasteCategories['Other'];
      const emissionFactor = category.co2EmissionFactor;

      // Multiply the item's weight by the emission factor to calculate CO₂ footprint
      carbonFootprint += item.weight * emissionFactor;
    });

    const requestCounts = {
      daily: {},
      monthly: {},
      yearly: {},
    };

    acceptedRequests.forEach(item => {
      const createdAt = new Date(item.createdAt);
      
      // Adjust the date to a specific time zone, e.g., "Asia/Kolkata" (Indian Standard Time)
      const day = createdAt.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).split(',')[0]; // Get only the date part in format: MM/DD/YYYY or YYYY-MM-DD based on locale

      const month = createdAt.getMonth() + 1; // 1-12
      const year = createdAt.getFullYear();

      // Count daily requests
      if (!requestCounts.daily[day]) requestCounts.daily[day] = 0;
      requestCounts.daily[day]++;

      // Count monthly requests
      const monthKey = `${year}-${month}`;
      if (!requestCounts.monthly[monthKey]) requestCounts.monthly[monthKey] = 0;
      requestCounts.monthly[monthKey]++;

      // Count yearly requests
      if (!requestCounts.yearly[year]) requestCounts.yearly[year] = 0;
      requestCounts.yearly[year]++;
    });

    // 4. Location with most requests (only "navi mumbai", "thane", or "mumbai")
    const locationCounts = {
      'navi mumbai': 0,
      'thane': 0,
      'mumbai': 0
    };

    ewasteItems.forEach(item => {
      const location = item.location.toLowerCase();

      // Check if the location string contains any of the desired keywords
      if (location.includes('navi mumbai')) {
        locationCounts['navi mumbai']++;
      } else if (location.includes('thane')) {
        locationCounts['thane']++;
      } else if (location.includes('mumbai')) {
        locationCounts['mumbai']++;
      }
    });

    // Determine the most requested location
    const mostRequestedLocation = Object.keys(locationCounts).reduce((a, b) =>
      locationCounts[a] > locationCounts[b] ? a : b
    );

    // Send the report data in response
    res.status(200).json({
      totalAcceptedWeight,
      carbonFootprint,
      requestsPerTimeFrame: requestCounts,
      mostRequestedLocation,
    });
  } catch (error) {
    console.error('Error generating dashboard report:', error.message);
    res.status(500).json({ error: 'Server error while generating report', details: error.message });
  }
});



export default router;