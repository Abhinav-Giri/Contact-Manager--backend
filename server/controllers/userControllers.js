const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const User = require("../models/userModel")

const registerUser = asyncHandler( async(req,res)=>{
    const {name, email,password} = req.body
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(302)
        throw new Error("User already exists")
    }
const newUser = await bcrypt.hash(password, 10)
const user = await User.create({
    name,
    email,
    password: newUser
})
// console.log("%%newUser%%", user)
if(user){
    res.status(201).json({_id: user.id, email: user.email})
}
else{
    res.status(400)
    throw new Error("User data is not valid");
}
    res.json({message: "User Registered"})
}
)

const loginUser = asyncHandler( async(req,res)=>{
   const {email, password} = req.body;
   if(!email || !password){
    res.status(400);
    throw new Error("All fields are mandatory")
   }
   userExists = await User.findOne({email})
   const userVerified = await bcrypt.compare(password,userExists.password)
   if(userExists && userVerified ){
    const accessToken = jwt.sign(
        {
            user:{
                username:userExists.user,
                email:userExists.email,
                id: userExists.id
            }
        }, process.env.ACCESS_SECRET_TOKEN,
        {expiresIn: "10m"}
    )
    res.status(201).json({accessToken})
   } else{
    res.status(401)
    throw new Error("Access denied")
   }
    res.json({message: "User loggedIn "})
})

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})
module.exports = {registerUser, loginUser, currentUser}