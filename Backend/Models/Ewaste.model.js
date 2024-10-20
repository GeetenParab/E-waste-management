import mongoose from "mongoose";

const ewasteSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true
  },
  PhoneNumber: {
    type: String,  // Changed to String for phone number format
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
    default: "pending"  
  }
}, {
  timestamps: true  
});

const Ewaste = mongoose.model('Ewaste', ewasteSchema);

export default Ewaste;
