import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
    const [successMessage, setSuccessMessage] = useState({
        success: "",
        message: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("http://localhost:5000/api/me", {
                    credentials: "include",
                });
                if (res.ok) {
                    navigate("/todo"); 
                }
            } catch (err) {
                console.error("Not logged in", err);
            }
        }
        checkAuth();
    }, [navigate]);
    const sendData = async () => {
        if (!data.email) {
            setErrors((prev) => ({ ...prev, emailError: "Email is required" }));
            return;
        }
        if (!data.password) {
            setErrors((prev) => ({
                ...prev,
                passwordError: "Password is required",
            }));
            return;
        }
        try {
            setErrors({ emailError: "", passwordError: "" });
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            const result = await response.json();
            if (response.ok) {
                navigate("/todo");
            }
            setSuccessMessage({
                success: response.ok,
                message: result.message,
            });
        } catch (err) {
            console.error(err);
            setSuccessMessage({ success: false, message: err.message });
        }
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendData();
            }}
        >
            <div className="login-container container">
                <h3>Login</h3>
                <div>
                    <label htmlFor="loginEmail">Email :</label>
                    <input
                        id="loginEmail"
                        type="email"
                        placeholder="type your email here"
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                            setSuccessMessage({
                                ...successMessage,
                                message: "",
                            });
                        }}
                    />
                </div>
                <div style={{ color: "red" }}>{errors.emailError}</div>
                <div>
                    <label htmlFor="loginPassword">Password :</label>
                    <input
                        id="loginPassword"
                        type="password"
                        minLength={8}
                        placeholder="type your password here"
                        value={data.password}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                            setSuccessMessage({
                                ...successMessage,
                                message: "",
                            });
                        }}
                    />
                </div>
                <div style={{ color: "red" }}>{errors.passwordError}</div>
                <button type="submit">Login</button>
                <div
                    style={{
                        marginTop: "10px",
                        color: successMessage.success ? "green" : "red",
                    }}
                >
                    {successMessage.message}
                </div>
                <button type="button" onClick={() => navigate("/")}>
                    Back to home
                </button>
            </div>
        </form>
    );
}
