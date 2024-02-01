const app = require("./app");
const dotenv = require("dotenv");
const databaseConnection = require("./configs/databaseConnection")

dotenv.config({path:"./configs/config.env"});

databaseConnection();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });