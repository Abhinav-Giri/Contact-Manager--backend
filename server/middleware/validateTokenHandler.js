const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async(req,res,next)=>{
let token;
let authHeader = req.headers.Authorization || req.headers.authorization
if(authHeader && authHeader.startsWith("Bearer")){
token = authHeader.split(" ")[1]
jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err,decoded)=>{
    if(err){
        res.status(401);
        res.json("User is not authorized");
    }
    req.user = decoded.user;
    console.log(decoded)
    next();
});
}
else{
    res.status(302)
    throw new error("pleae make sue you have corect Bearer token")
}
})
module.exports = validateToken;