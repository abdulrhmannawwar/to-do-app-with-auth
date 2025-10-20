import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";
export default function Register() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
    const [successMessage, setSuccessMessage] = useState({
        success: "",
        message: "",
    });
    const navigate = useNavigate();
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
            console.log("Sending data");
            setErrors({ emailError: "", passwordError: "" });
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage({ success: true, message: result.message });
            } else {
                setSuccessMessage({ success: false, message: result.message });
            }
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
            <div className="register-container container">
                <h3>Register with email and password</h3>
                <div>
                    <label htmlFor="registerEmail">Email :</label>
                    <input
                        id="registerEmail"
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
                    <label htmlFor="registerPassword">Password :</label>
                    <input
                        id="registerPassword"
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
                <button type="submit">Register</button>
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
