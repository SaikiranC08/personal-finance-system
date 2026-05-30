import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { validateToken } from "../services/validateService";
import {
    useToast
} from "../../../shared/components/feedback/toastContext";
import Spinner from "../../../shared/components/states/Spinner";
import {
    clearSession
} from "../../../utils/session";

function ProtectedRoute({ children }) {

    const [isValid, setIsValid] = useState(null);

    const toast =
        useToast();

    useEffect(() => {

        async function validate() {

            try {

                const result = await validateToken();

                if (!result) {
                    clearSession();
                    toast.error(
                        "Session expired. Please login again."
                    );
                }

                setIsValid(result);

            } catch {

                clearSession();
                toast.error(
                    "Session expired. Please login again."
                );
                setIsValid(false);
            }
        }

        validate();

    }, [toast]);

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

    if (!isValid) {

        clearSession();

        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
