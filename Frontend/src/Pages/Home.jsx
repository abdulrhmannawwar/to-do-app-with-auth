import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-container container">
            <div>
                {" "}
                <h2>Welcome to your to-do app</h2>
                <h3>Write down what needs to be done</h3>
                <div className="btnContainer">
                    <button onClick={() => navigate("/register")}>
                        Register
                    </button>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    );
}
