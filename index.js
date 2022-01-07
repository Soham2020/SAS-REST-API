const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users') 
const authRoute = require('./middleware/auth');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/carts');
const orderRoute = require('./routes/orders');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connetcted Successfully!!"))
    .catch((err) => console.log(err))

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.listen(5000, () => {
    console.log("SAS-REST-API server is up on running!!");
})