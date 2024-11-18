import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    imgURL:String,
    createAt:{
        type:Date,
        default:Date.now
    }
})

export const Schema=mongoose.model("MySchema",userSchema);

