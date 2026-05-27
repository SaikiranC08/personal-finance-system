import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import Landing from "./features/auth/pages/Landing";

import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ExpensesPage from "./features/expenses/pages/ExpensesPage";
import FundsPage from "./features/funds/pages/FundsPage";
import AnalyticsPage from "./features/analytics/pages/AnalyticsPage";
import ReportsPage from "./features/reports/pages/ReportsPage";

import PublicRoute from "./features/auth/routes/PublicRoute";
import ProtectedRoute from "./features/auth/routes/ProtectedRoute";

import DashboardLayout from "./shared/components/layout/DashboardLayout";
import CreateExpensePage from "./features/expenses/pages/CreateExpensePage";
import EditExpensePage
from "./features/expenses/pages/EditExpensePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Landing />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute> <DashboardLayout /> </ProtectedRoute>}>

                    <Route path="/home" element={<DashboardPage />} />

                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route path="/expenses/create" element={<CreateExpensePage />}/>
                    <Route path="/expenses/edit/:expenseId" element={<EditExpensePage />} />

                    <Route path="/funds" element={<FundsPage />} />

                    <Route path="/analytics" element={<AnalyticsPage />} />

                    <Route path="/reports" element={<ReportsPage />} />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;