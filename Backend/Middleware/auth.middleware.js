require("dotenv").config({ path: __dirname + "/../.env" });
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
