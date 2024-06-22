import mongoose, { Schema } from "mongoose";

const studentSchema=new Schema({
  roll:Number,
  fname:String,
  lname:String,
  city:String,
  state:String,
  mob:Number,
  gender:String
});

export const Student = mongoose.model("student",studentSchema);