const router = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken');
const Feedback = require('../models/Feedback');

router.post("/post", async(req, res) => {
    const newFeedback = new Feedback({
        username: req.body.username,
        name: req.body.name,
        message: req.body.message,
    });
    try {
        const saveFeedback = await newFeedback.save();
        res.status(201).json(saveFeedback);
    }catch(err) {
        res.status(500).json(err);
    }
})

router.get("/get", verifyToken, async(req, res) => {
    try {
        const get = await Feedback.find();
        res.status(201).json(get);
    }catch(err) {
        res.status(500).json(err);
    }
})
module.exports = router;