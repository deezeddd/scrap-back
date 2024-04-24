import mongoose from "mongoose";
import 'dotenv/config'

async function connectDB() {
  return mongoose.connect(process.env.URI
  ).then(() => {
    console.log("Mongo Connected");
  }).catch((err)=> {
    console.log(err)
  });
}

export default connectDB;


