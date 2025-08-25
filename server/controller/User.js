import User from "../model/User.js";
import bcryptjs from "bcryptjs";

const postSignup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                error: "Email already in use"
            })
        }

        const hashpassword = await bcryptjs.hash(password, 10);
        const user = new User({ fullName, email, password: hashpassword });

        const saveduser = await user.save()
        res.status(201).json({
            success: true,
            message: "User registered successfully !",
            data: saveduser
        })
    }
    catch (e) {
        console.log(e)
        console.error(e.message)
        res.status(500).json({
            success: false,
            message: "An error occurred during registration.",
            data: null
        })
    }

}

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

        user.password = undefined;
        res.json({
            success: true,
            message: "Login Successfully !",
            data: user
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
}