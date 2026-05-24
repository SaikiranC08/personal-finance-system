import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { validateToken } from "../services/validateService";

function ProtectedRoute({ children }) {

    const [isValid, setIsValid] = useState(null);

    useEffect(() => {

        async function validate() {

            const result = await validateToken();

            setIsValid(result);
        }

        validate();

    }, []);

    if (isValid === null) {

        return <h1>Loading...</h1>;
    }

    if (!isValid) {

        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;