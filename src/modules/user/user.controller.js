import { compareSync,hashSync } from "bcrypt";
import  jwt  from 'jsonwebtoken';
import userModel from "../../../DB/models/user.model.js";
import { errorHandlingClass } from "../../utils/error-class.utils.js";    
import { sendEmail } from './../../services/send-email.service.js'; 
import { createToken, loginToken } from "../../utils/createToken.js";


export const signUp = async (req, res,next) => {
  // destruct data from req.body
  const { name, email, password } = req.body;
  // check if the email is already exists & send error if it is
  const emailExist = await userModel.findOne({ email });
  if (emailExist)
    return next(new errorHandlingClass("Email already exist", 400));

  // create new user

  const newUser = await userModel.create({
    name,
    email,
    password: hashSync(password, +process.env.SALT_ROUNDS),
  });


  // generate token

  const token = createToken({id :newUser._id, name: newUser.name, email:newUser.email});

  // send email & send error if email not sent
  const info = await sendEmail({
    to: email,
    subject: "job submission for you",
    htmlMessage: `<a href="${req.protocol}://${req.headers.host}/user/confirmEmail/${token}">click here</a>`,
  });
  if (!info) {
    return next(new errorHandlingClass("Email not sent", 400));
  }
  //save user
  const createdUser = await newUser.save();

  // send response
  res.status(201).json({ msg: "User created successfully", createdUser });
}



export const confirmEmail=async (req,res,next)=>{
    const {token} = req.params
    const {tokenInfo}  = jwt.verify(token,process.env.JWT_SECRET_CREATE_USER)
    const User = await userModel.findByIdAndUpdate(tokenInfo.id,{isConfirmed:true},{new:true}).select("-password")
    if(!User) 
     return next(new errorHandlingClass("user not found", 404))
    if(User.confirmEmail) return next(new errorHandlingClass("email already confirmed", 400));
    const updatedUser = await User.save()
    res.status(200).json(updatedUser)
    
  }


  
export const signIn = async (req, res, next) => { 
    const { email, password } = req.body;

    const _user = await userModel.findOne({email});

    if (!_user) {
        return next(new errorHandlingClass("email or password not correct", 400));
    }else
    if (!compareSync(password, _user.password)) {
        return next(new errorHandlingClass("email or password not correct", 400));
    }
    
    // generate token
    
    const token = loginToken(_user._id);

    res.status(200).json({ token });
}
