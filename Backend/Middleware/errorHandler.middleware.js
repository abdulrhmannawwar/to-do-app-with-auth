module.exports.serverErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        errorMessage: err.message || "Internal server error",
    });
};
module.exports.clientErrorHandler = (req, res, next) => {
    res.status(404).json({ success: false, errorMessage: "Route not found" });
};
