import jwt from "jsonwebtoken";
const { sign } = jwt;
import User from "../models/authModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return sign({ email, userId }, process.env.JWT_SECRET_KEY, { expiresIn: maxAge });
}

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = await User.create({ email, password });

        const token = createToken(newUser._id, email);

        res.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                image: newUser.image,
                color: newUser.color,
                profileSetUp: newUser.profileSetUp,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" }); // 401 for unauthorized
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password); // Call method on user instance
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" }); // Same message for security
        }

        // Create token with correct parameter order
        const token = createToken(user.email, user._id);

        res.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "None",
            httpOnly: true // Recommended for security
        });

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                profileSetUp: user.profileSetUp,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "An error occurred during login",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}


export const getUserInfo = async (req, res, next) => {
    try {

        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User with this id not found" });
        }
        return res.status(200).json({
            user: {
                id: userData._id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
                profileSetUp: userData.profileSetUp,
            },
        });
    } catch (error) {
        console.error("Error getting user info:", error);
        return res.status(500).json({
            message: "An error occurred while getting user info",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}


export const updateUserInfo = async (req, res, next) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;

        if (!firstName || !lastName || !color) {
            return res.status(400).json({ message: "Please provide at least one field to update" });
        }

        const userData = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            color,
            profileSetUp: true
        }, { new: true, runValidators: true });

        return res.status(200).json({
            user: {
                id: userData._id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
                profileSetUp: userData.profileSetUp,
            },
        });

    } catch (error) {
        console.error("Error updating user info:", error);
        return res.status(500).json({
            message: "An error occurred while updating user info",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}