const express = require("express")
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');
const multer = require("multer")
const path = require('path')
const authRoute = require('./routes/auth');
const userRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const categoryRoute = require("./routes/category")

const app = express();

dotenv.config();
app.use(express.json())
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL).then(console.log("connected"));


const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, "images")
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
});

const upload = multer({storage:storage})

app.post("/api/upload", upload.single("file"),(req, res)=>{
    res.status(200).json("file has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/category", categoryRoute)

app.listen(5000, ()=>{
    console.log("app is working")
})