import mongoose from "mongoose";


export async function connectDB() {

  try{

      await mongoose.connect('mongodb://127.0.0.1:27017/Collabsphere',{
            serverSelectionTimeoutMS: 5000 
        });
      console.log("Connected to MongoDB");
  }
  catch(error){
    console.log(error);
    process.exit(1);
  }

}