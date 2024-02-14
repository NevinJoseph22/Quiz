import mongoose from "mongoose";

export const DB=()=>{
    mongoose.connect(process.env.CONNECTION_STRING,{dbName:"Quiz"}).then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log(err);
    })
}