import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateToken } from "../services/validateService";

function Landing() {

    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function check() {
            const isValid = await validateToken();
            if (isValid) {
                navigate("/home");   // ✅ already logged in → skip landing
            }
            setChecking(false);
        }
        check();
    }, []);

    return (

        <div className="landing-page flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">

            <h1 className="text-3xl font-bold mb-4">Personal Finance System</h1>

            <button onClick={() => navigate("/login")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

                Login

            </button>

            <button onClick={() => navigate("/signup")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">

                Signup

            </button>

        </div>
    );
}

export default Landing;