import mongoose from "mongoose"

const schema=mongoose.Schema

const question_schema=new schema({
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    answer:String
})

const question_model=mongoose.model("questions",question_schema)

export default question_model