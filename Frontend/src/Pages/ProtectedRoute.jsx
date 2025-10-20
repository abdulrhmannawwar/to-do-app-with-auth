import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("http://localhost:5000/api/me", {
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Not Authenticated");

                setIsAuth(true);
            } catch (err) {
                console.error(err);
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;

    return isAuth ? children : <Navigate to="/login" replace />;
}
