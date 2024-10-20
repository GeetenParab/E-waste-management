import express from "express";
import protectRoute from "../Middleware/protectRoute.js";
import { upload } from "../Middleware/multer.middleware.js";
import { getAllRequest, pickupRequest } from "../controllers/Ewaste.controllers.js";


const router = express.Router();
 
router.route("/disposal").post(
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    protectRoute,
    pickupRequest
    )

router.get("/allRequest",protectRoute,getAllRequest);


export default router;
