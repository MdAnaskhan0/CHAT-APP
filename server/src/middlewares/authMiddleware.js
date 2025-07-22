import jwt, { decode } from "jsonwebtoken";

export const varefyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send("You are not authorized to access this resource");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(403).send("Token is not valid!")
        }
        req.userId = decode.userId;
        next();
    });
}