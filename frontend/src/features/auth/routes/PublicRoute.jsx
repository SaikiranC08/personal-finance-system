import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../services/validateService";
import Spinner from "../../../shared/components/states/Spinner";

function PublicRoute({ children }) {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        async function check() {
            try {
                const result = await validateToken();
                setIsValid(result);
            } catch {
                setIsValid(false);
            }
        }
        check();
    }, []);

    if (isValid === null) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-sm font-medium text-slate-500">
                    <Spinner
                        className="size-5 text-emerald-700"
                        label="Checking session..."
                    />
                </div>
            </div>
        );
    }

    // ✅ Already logged in → push to home, don't show login/signup
    if (isValid) return <Navigate to="/home" replace />;

    return children;
}

export default PublicRoute;
