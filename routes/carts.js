const router = require('express').Router();
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const Cart = require('../models/Cart');

// create
router.post("/", verifyToken, async(req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err) {
        res.status(500).json(err);
    }
})

// update a single product
router.put("/:id", verifyToken, async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(updatedCart)
    }catch(err) {
        res.status(500).json(err);
    }
})

// delete by admin only
router.delete("/:id", verifyToken, async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart deleted!!");
    }catch(err) {
        res.status(500).json(err);
    }
})

// get cart by user_id
router.get("/find/:userId", verifyToken, async(req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id})
        res.status(200).json(cart);
    }catch(err) {
        res.status(500).json(err);
    }
})
// get all the carts
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart);
    }catch(err) {
        res.status(500).json(err);
    }
})
module.exports = router;