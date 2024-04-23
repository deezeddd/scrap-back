import mongoose from "mongoose";

async function connectDB() {
  return mongoose.connect("mongodb+srv://Vedant:RZXd6ekaMq29Br3@papascrap-db.qnnvada.mongodb.net/PapaScrapDB?retryWrites=true&w=majority"
  ).then(() => {
    console.log("Mongo Connected");
  }).catch((err)=> {
    console.log(err)
  });
}

export default connectDB;


