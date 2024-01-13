const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); // for accepting data from diffrent port and servers
app.use(express.json()) // axios use json format to send data. so we need to use this middleware to see it

//userRoutes
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1', userRoutes);



module.exports = app;