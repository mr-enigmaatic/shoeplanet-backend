const mongoose = require("mongoose");

const databaseConnection = ()=> {
    // database connection established here
    mongoose.connect(process.env.DB_URI) // connect method will return a promise
    .then((res)=> console.log(`Database connected with ${res.connection.host}`))
    .catch((err)=> console.log(err.message));
    
}

module.exports = databaseConnection;