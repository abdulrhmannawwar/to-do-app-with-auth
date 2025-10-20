const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(req, res, next) {
    const { email } = req.body;

    if (!email || !email.match(emailRegex)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    next(); 
}

module.exports = validateEmail;
