const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SignUp
exports.signup = async (req, res) => {
    try {
        // Fetch user info from req body
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Password validation
        if (password.length !== 6) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid password (6 characters)"
            });
        }

        // User already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const user = await User.create({ name: name, email: email, password: hashPassword });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
        });

    } catch (error) {
        console.log("Error in signup Controller: " + error.message);
        return res.status(500).json({
            success: false,
            message: "SignUp failed"
        });
    }
}

// Login
exports.login = async (req, res) => {
    try {
        // Fetch data from req.body
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(402).json({
                success: false,
                message: "This email is not registered"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: user,
                Token: token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

    } catch (error) {
        console.log("Error in Login Controller: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
}
