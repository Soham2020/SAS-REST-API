const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connetcted Successfully!!"))
    .catch((err) => console.log(err))

app.listen(5000, () => {
    console.log("SAS-REST-API server is up on running!!");
})