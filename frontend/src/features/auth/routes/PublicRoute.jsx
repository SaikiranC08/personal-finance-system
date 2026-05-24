import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../services/validateService";

function PublicRoute({ children }) {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        async function check() {
            const result = await validateToken();
            setIsValid(result);
        }
        check();
    }, []);

    if (isValid === null) return <h1>Loading...</h1>;

    // ✅ Already logged in → push to home, don't show login/signup
    if (isValid) return <Navigate to="/home" />;

    return children;
}

export default PublicRoute;