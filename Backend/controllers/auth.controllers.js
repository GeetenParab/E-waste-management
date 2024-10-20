import bcrypt from 'bcryptjs';
import User from "../Models/User.model.js";
import generateTokenSetCookie from '../utils/generateToken.js';
// import { uploadonCloudinary } from '../utils/cloudinary.js';


export const signup = async (req, res) => {
  try {
    const { username, phoneNumber, email, fullName, password ,confirmPassword} = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match." });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists." });
    }

    const existingUser1 = await User.findOne({ username });
    if (existingUser1) {
      return res.status(400).json({ error: "username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create new user
    const newUser = new User({
      fullName,
      username,
      phoneNumber,
      password: hashedPassword,
      email
    });

   if (newUser) {
      // Generate JWT token here
      generateTokenSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
         _id: newUser._id,
         fullName: newUser.fullName,
         username: newUser.username,
         phoneNumber: newUser.phoneNumber,
         email:newUser.email
      });
   } else {
      res.status(400).json({ error: "Invalid user data" });
   }
} catch (error) {
   console.log("Error in signup controller", error.message);
   res.status(500).json({ error: "Internal Server Error" });
}
};

 

export const login = async (req,res)=>{
    
   try {
         const {email,password} = req.body;
         const user = await User.findOne({email});
         const isPasswordCorrect  = await bcrypt.compare(password,user?.password || "");

         if(!email || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
         }

         generateTokenSetCookie(user._id,res);

         res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            phoneNumber: user.phoneNumber,
            email:user.email
         });


   } catch (error) {
      console.log("Error in Login controller", error.message);
      res.status(500).json({ error: 'Internal server error' });
      
   }

    
}
export const logout = (req,res)=>{
   try {
            res.cookie("jwt","",{maxAge:0});
            res.status(200).json({message:"logged out successfully"})   

   } catch (error) {
      console.log("Error in Logout controller", error.message);
      res.status(500).json({ error: 'Internal server error' });
   }
   

}