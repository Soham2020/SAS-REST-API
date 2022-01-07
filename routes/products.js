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

// // delete by admin only
// router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id)
//         res.status(200).json("User deleted!!");
//     }catch(err) {
//         res.status(500).json(err);
//     }
// })

// // get user by admin only
// router.get("/find/:id", verifyTokenAndAdmin, async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         const { password, ...others } = user._doc;
//         res.status(200).json(others);
//     }catch(err) {
//         res.status(500).json(err);
//     }
// })
// // get all the users
// router.get("/", verifyTokenAndAdmin, async(req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users);
//     }catch(err) {
//         res.status(500).json(err);
//     }
// })
// // get user logged in stats
// router.get("/stats", verifyTokenAndAdmin, async(req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//     try {
//         const data = await User.aggregate([
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: lastYear
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 },
//                 },
//             },
//         ])
//         res.status(200).json(data);
//     }catch(err) {
//         res.status(500).json(err);
//     }
// })
module.exports = router;