const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/users') 
const authRoute = require('./middleware/auth');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/carts');
const orderRoute = require('./routes/orders');
const stripeRoute = require('./routes/stripe');
const feedbackRoute = require('./routes/feedback');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connetcted Successfully!!"))
    .catch((err) => console.log(err))

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h1>SAS-REST-API is UP, and running!</h1>")
})
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/stripe", stripeRoute)
app.use("/api/feedback", feedbackRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SAS-REST-API server is up on running!! ${PORT}`);
})