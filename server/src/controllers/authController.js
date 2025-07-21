import { sign } from "jsonwebtoken";
import User from "../models/authModel";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, password) => {
    return sign({ email, password }, process.env.JWT_SECRET_KEY, { expiresIn: maxAge })
}

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Please provide email and password")
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const newUser = await User.create({ email, password });
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        return res.status(201).json({
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                image: newUser.image,
                color: newUser.color,
                profileSetUp: newUser.profileSetUp,
            },
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}