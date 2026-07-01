import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



export async function connectDB() {

  try{

      await mongoose.connect(`mongodb://mongo:27017/${process.env.DB_NAME}`,{
            serverSelectionTimeoutMS: 5000 
        });
      console.log("Connected to MongoDB!");
      
  }
  catch(error){
    console.log(error);
    process.exit(1);
  }

}