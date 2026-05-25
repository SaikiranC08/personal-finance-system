import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { validateToken } from "../services/validateService";

function ProtectedRoute({ children }) {

    const [isValid, setIsValid] = useState(null);

    useEffect(() => {

        async function validate() {

            try {

                const result = await validateToken();

                setIsValid(result);

            } catch (error) {

                setIsValid(false);
            }
        }

        validate();

    }, []);

    if (isValid === null) {

        return (
            <div className="h-screen flex items-center justify-center">

                <h1>Loading...</h1>

            </div>
        );
    }

    if (!isValid) {

        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;