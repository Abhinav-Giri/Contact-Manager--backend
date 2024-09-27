const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter the contact name"]
    },
    email:{
        type: String,
        required:[true,"Please add the contact email address"]
    },
    password:{
        type: String,
        required:[true,"Please add the contact phone number"]
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);