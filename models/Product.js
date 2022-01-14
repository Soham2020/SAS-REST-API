const mongoose= require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        img: { type: String, required: true },
        details: { type: String, required:true },
    }, { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);