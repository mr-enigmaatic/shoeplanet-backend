const bcrypt = require("bcrypt");
const saltRound = 10;


let users = [];

function isEmailTaken(email) {
    return users.some((user) => user.email === email);
}

exports.userRegister = (req, res) => {
    const { name, email, password } = req.body;

    // const hashedPass =  bcrypt.hash(password, saltRound);
    
    if (isEmailTaken(email)) {
        res.status(400).json({
            success: false,
            message: 'Email is already taken'
        });

    } else {
        const newUser = {
            name: name,
            email: email,
            password: password
        }

        console.log(newUser);
        users.push(newUser);
        res.status(200).json({
            success: true,
            message: "Registration Successfull",
            users
        });
    }
}

exports.userLogin = (req, res) => {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.password === password);
    console.log(users);
    console.log("user", user);


    if (user) {
        res.status(200).json({
            success: true,
            message: "Login Successfull",
            isAuthenticated: true,
            user
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid Credentials!"
        });
    }

}