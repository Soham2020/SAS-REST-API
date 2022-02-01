const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const Product = require('../models/Product');

// create
router.post("/", verifyTokenAndAdmin, async(req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err) {
        res.status(500).json(err);
    }
})

// update a single product
router.put("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(updatedProduct)
    }catch(err) {
        res.status(500).json(err);
    }
})

// delete by admin only
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted!!");
    }catch(err) {
        res.status(500).json(err);
    }
})

// get product by id
router.get("/find/:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(err) {
        res.status(500).json(err);
    }
})
// get all the products
router.get("/", verifyToken, async(req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json(product);
    }catch(err) {
        res.status(500).json(err);
    }
})
module.exports = router;