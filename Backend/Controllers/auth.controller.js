require("dotenv").config({ path: __dirname + "/../.env" });
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
module.exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        res.status(201).json({
            message: "User created successfully",
            user: { id: user._id, email: user.email },
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Wrong password" });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, secret, {
            expiresIn: "1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        })
            .status(200)
            .json({
                message: "Login successful",
                user: { id: user._id, email: user.email },
                token,
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.logOut = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

module.exports.me = (req, res) => {
    if (req.user) {
        res.json({ message: "Authenticated!", user: req.user });
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
};
