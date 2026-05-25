import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

    return (

        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Right Side */}
            <div className="flex flex-col flex-1">

                {/* Navbar */}
                <Navbar />

                {/* Dynamic Pages */}
                <main className="flex-1 p-6 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;