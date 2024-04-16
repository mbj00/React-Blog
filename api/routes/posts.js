const router = require("express").Router();
const User = require("../modals/User")
const Posts = require("../modals/Posts")

// create post

router.post("/", async (req, res) => {
    const newPost = await new Posts(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Posts.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },
                    { new: true })
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only update your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        
        if (post.username === req.body.username) {
            try {
                await post.deleteOne({_id:req.params.id});
                res.status(200).json("post has been deleted");
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only update your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }

})


// get post

router.get("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})


// get all posts

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Posts.find({username:username})
        } else if(catName){
            posts = await Posts.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Posts.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;