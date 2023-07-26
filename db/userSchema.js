import mongoose, { trusted } from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type: Number,
        required:true
    },
    token :{
        type:String
    }
})

const User = mongoose.model("User",userSchema)
export default User