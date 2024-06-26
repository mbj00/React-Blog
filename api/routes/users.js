const router = require("express").Router();
const User = require("../modals/User")
const Posts = require("../modals/Posts")
const bcrypt = require("bcrypt")

// Update

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account")
    }
})

// Delete

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findOne({_id: req.params.id});
            try {
                await Posts.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found")
        }

    } else {
        res.status(401).json("You can delete only your account")
    }
})


// get user

router.get("/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;