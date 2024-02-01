const bcrypt = require("bcrypt");
const saltRound = 10;

const User = require("../models/userModel");

exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, saltRound);
        const existingUser = await User.findOne({ email });


        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exist!'
            });

        }

        const user = await User.create({
            name,
            email,
            password: hashedPass
        });

        console.log(user);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User registration failed!"
            });
        }

        res.status(200).json({
            success: true,
            message: "User registration successfully completed",
            user
        });

    } catch (error) {
        console.log(error.message);
    }

}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found!"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        console.log("isValid", isValid);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successfull!",
            isAuthenticated: true,
            user
        });

    } catch (error) {
        console.log(error.message);
    }

}