import jwt from "jsonwebtoken";

   // generate token to create user

 export const createToken = (userInfo) =>
  jwt.sign({ tokenInfo: userInfo }, process.env.JWT_SECRET_CREATE_USER, {
  expiresIn: process.env.EXPIRES_IN,
 });

   // generate token to login user

  export const loginToken = (userInfo) =>
  jwt.sign({ tokenInfo: userInfo }, process.env.JWT_SECRET_LOGIN_USER, {
  expiresIn: process.env.EXPIRES_IN,
  });