import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./Styles/Theme.css";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Todo from "./Pages/Todo";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("dark");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("dark", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div>
            <button
                className="switch-btn"
                onClick={() => setDarkMode(!darkMode)}
            >
                <i
                    className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}
                ></i>
            </button>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                <Route
                    path="/todo"
                    element={
                        <ProtectedRoute>
                            <Todo />
                        </ProtectedRoute>
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
