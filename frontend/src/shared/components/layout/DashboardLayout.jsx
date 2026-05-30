import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

function DashboardLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (

        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-950">

            <Sidebar
                isCollapsed={isSidebarCollapsed}
                isOpen={isSidebarOpen}
                onCollapseToggle={() => setIsSidebarCollapsed((current) => !current)}
                onOpenChange={setIsSidebarOpen}
            />

            {!isSidebarOpen && (
                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="fixed top-4 left-4 z-30 flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
                    aria-label="Open sidebar"
                >
                    <Menu className="size-5" aria-hidden="true" />
                </button>
            )}

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">

                    <div className="mx-auto w-full max-w-7xl">
                        <Outlet />
                    </div>

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;
