const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
//     username: {
//         typpe : String,
//         // required: true,
//         // unique : true
//     },
//     email : {
//         typpe : String,
//         // required: true,
//         // unique : true
//     },
//     password :{
//         typpe : String,
//         // required: true,
//         // unique : true
//     },
//     ProfilePicture:{
//         typpe: String,
//         // default : ""
//     }
// },{timestamps: true}
    username: String,
    email: String,
    password : String,
    profilepic: String
},{timestamps: true}
)

module.exports = mongoose.model("users", UserSchema)