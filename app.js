const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({credentials:true, origin:true})); // for accepting data from diffrent port and servers
app.use(express.json()) // axios use json format to send data. so we need to use this middleware to see it
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

//userRoutes
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1', userRoutes);



module.exports = app;