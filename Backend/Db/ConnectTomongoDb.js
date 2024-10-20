import mongoose from 'mongoose';


const connectToMongoDb = async ()=>{
    try {
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("connected to MongoDb");
        
    } catch (error) {
        console.log("Error connecting to MongoDb",error.message);
    }
}

export default connectToMongoDb;