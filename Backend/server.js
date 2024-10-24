import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
//to parse incoming requests with JSON payload from req.body; .
app.use(cookieParser());
///


// import authRoutes from "./Routes/auth.routes.js"
import connectToMongoDb from "./Db/ConnectTomongoDb.js";
import authRoutes from "./Routes/auth.routes.js"
import  wasteRoutes from "./Routes/Ewaste.route.js"
import adminRoutes  from "./Routes/Admin.route.js"


app.use("/api/auth",authRoutes);
app.use("/api/waste",wasteRoutes);
app.use("/api/admin",adminRoutes);




    
app.listen(5000,()=>{
    connectToMongoDb();
    console.log(`server is running on port ${PORT}`)
});




// http://localhost:5000/api/auth/login (post request)
// http://localhost:5000/api/auth/signup (post request)
// http://localhost:5000/api/auth/logout (post request)
// http://localhost:5000/api/waste/disposal     (post request)
// http://localhost:5000/api/waste/allRequest  (get request)
// http://localhost:5000/api/admin/login      (post request)
// http://localhost:5000/api/admin/dashboard    (get request)
// http://localhost:5000/api/admin/update-status/:id?id=66fd03d516a95cb872632b98 (put request)



