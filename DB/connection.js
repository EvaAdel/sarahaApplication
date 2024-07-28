 // establish for data base connection
 import mongoose from "mongoose";

 export const db_connection =async()=>{
    await mongoose.connect(process.env.CONNECTION_DB_URI);
    console.log("Database connected successfully");

 }
 