require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const authRoutes = require("./Routes/auth.route");
const todoRoutes = require("./Routes/todo.route");
const {
    serverErrorHandler,
    clientErrorHandler,
} = require("./Middleware/errorHandler.middleware");
const connectDB = require("./Config/db");

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api", authRoutes);
app.use("/api", todoRoutes);
app.use(serverErrorHandler);
app.use(clientErrorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (err) {
        console.error("Something went wrong", err.message);
    }
};
startServer();
