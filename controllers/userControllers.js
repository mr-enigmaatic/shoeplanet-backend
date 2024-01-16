const bcrypt = require("bcrypt");
const saltRound = 10;


let users = [];

function isEmailTaken(email) {
    return users.some((user) => user.email === email);
}

exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, saltRound);
    
    
    if (isEmailTaken(email)) {
        return res.status(400).json({
            success: false,
            message: 'Email is already taken'
        });

    } else {
        const newUser = {
            name: name,
            email: email,
            password: hashedPass
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

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    

    const user = users.find((u) => u.email === email);
    //finding user with same email
    console.log("user", user);

   

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found!"
        });
    }

    const isValid = await bcrypt.compare(password, user.password);
    //checking password and encrypted password


    if (!isValid) {
        res.status(500).json({
            success: false,
            message: "Invalid Credentials",
        });
    } else {
        res.status(200).json({
            success: true,
            message: "Login Successfull!",
            isAuthenticated: true,
            user
        });
    }

}