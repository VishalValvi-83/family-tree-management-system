import User from "../model/User.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

// Helper function to generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

const postSignup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                error: "Email already in use"
            });
        }

        const hashpassword = await bcryptjs.hash(password, 10);
        const user = new User({ fullName, email, password: hashpassword });

        const savedUser = await user.save();

        // Respond with user data and a token upon successful registration
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: {
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                token: generateToken(savedUser._id),
            }
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            success: false,
            message: "An error occurred during registration.",
        });
    }
};

const postlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with this email: ${email}`
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // If login is successful, respond with user data and a new token
        res.json({
            success: true,
            message: "Login Successfully!",
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id), // The important part
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "An error occurred during login."
        });
    }
};

export {
    postSignup,
    postlogin,
};