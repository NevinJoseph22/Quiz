import mongoose from "mongoose";

const schema=mongoose.Schema
const admin_schema=new schema({
    email:String,
    password:String
})

const admin_model=mongoose.model("admin",admin_schema)
export default admin_model