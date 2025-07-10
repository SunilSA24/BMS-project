const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

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
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            })
        }

        if (req.body.password !== user.password) {
            return res.json({
                success: false,
                message: 'Invalid password enter'
            })
        }

        // generate jwt token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d"
        })

        res.json({
            success: true,
            message: "Login successful",
            data: token,
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Invalid API call"
        })
    }
}

const getCurrentUser = async(req, res) => {
    try {
        const user = await User.findById(req.body.userId).select("-password");
        res.send({
            success: true,
            message: "User details fetched successfully",
            data: user
        });
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}

module.exports = { registerUser, loginUser, getCurrentUser }