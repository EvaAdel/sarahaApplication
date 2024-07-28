import mongoose from "mongoose";


const {Schema,model} = mongoose;


const userSchema = new Schema({
 
    name:{
        type:String,
        required:true,
        trim:true

    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    isConfirmed:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,    
        required:true,
    },

    OTP:{type:String,
        trim:true
    },
    OTPExpiry:Date

},{timestamps:true});

export default  mongoose.models.UserModel || model("userModel", userSchema);
