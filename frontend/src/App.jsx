import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import Home from "./features/auth/pages/Home";
import Landing from "./features/auth/pages/Landing";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoute from "./features/auth/routes/PublicRoute";
import ProtectedRoute from "./features/auth/routes/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Landing />} />

                <Route path="/login" element={<PublicRoute><Login /></PublicRoute> } />

                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute> } />

                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

            </Routes>

        </BrowserRouter>
    );
}

export default App
