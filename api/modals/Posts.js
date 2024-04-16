const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    title: String,
    desc :String,
    photo: String,
    username: String,
    categories: Array
},{timestamps: true}
)

module.exports = mongoose.model("Posts", PostsSchema)