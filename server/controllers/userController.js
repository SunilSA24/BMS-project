const User = require("../model/userModel")

const registerUser = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Invalid API call"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            })
        }

        if(req.body.password !== user.password) {
            return res.json({
                success: false,
                message: 'Invalid user'
            })
        }

        res.json({
            success: true,
            message: "Login successful"
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Invalid API call"
        })
    }
}

module.exports = { registerUser, loginUser }