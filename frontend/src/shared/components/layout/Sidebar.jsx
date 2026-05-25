import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="w-64 bg-black text-white p-5">

            <h1 className="text-2xl font-bold mb-10">
                FinanceTrack
            </h1>

            <nav className="flex flex-col gap-4">

                <NavLink to="/home">
                    Dashboard
                </NavLink>

                <NavLink to="/expenses">
                    Expenses
                </NavLink>

                <NavLink to="/funds">
                    Funds
                </NavLink>

                <NavLink to="/analytics">
                    Analytics
                </NavLink>

                <NavLink to="/reports">
                    Reports
                </NavLink>

            </nav>

        </div>
    );
}

export default Sidebar;