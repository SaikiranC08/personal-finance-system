import { NavLink, useNavigate } from "react-router-dom";
import {
    BarChart3,
    FileText,
    LayoutDashboard,
    LogOut,
    ReceiptText,
    Wallet,
    WalletCards
} from "lucide-react";

const navigationItems = [
    {
        to: "/home",
        label: "Dashboard",
        icon: LayoutDashboard
    },
    {
        to: "/expenses",
        label: "Expenses",
        icon: ReceiptText
    },
    {
        to: "/funds",
        label: "Funds",
        icon: WalletCards
    },
    {
        to: "/analytics",
        label: "Analytics",
        icon: BarChart3
    },
    {
        to: "/reports",
        label: "Reports",
        icon: FileText
    }
];

function Sidebar({
    isCollapsed,
    isOpen,
    onCollapseToggle,
    onOpenChange
}) {

    const navigate = useNavigate();

    function handleSignOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        navigate("/");
    }

    function closeOnMobile() {
        if (window.innerWidth < 768) {
            onOpenChange(false);
        }
    }

    return (

        <>
            {isOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close sidebar overlay"
                />
            )}

            <aside
                className={[
                    "fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#121614] px-3 py-5 text-white transition-all duration-300 md:static md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    isCollapsed ? "md:w-20" : "md:w-56"
                ].join(" ")}
            >

                <button
                    type="button"
                    onClick={onCollapseToggle}
                    className={[
                        "mb-8 flex shrink-0 items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-white/8",
                        isCollapsed ? "md:justify-center" : ""
                    ].join(" ")}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/25">
                            <Wallet className="size-5 text-emerald-300" aria-hidden="true" />
                        </div>

                        <div className={isCollapsed ? "min-w-0 md:hidden" : "min-w-0"}>
                            <h1 className="truncate text-lg font-semibold tracking-normal">
                                FundFlow
                            </h1>
                            <p className="truncate text-xs font-medium text-slate-400">
                                Finance workspace
                            </p>
                        </div>
                    </div>
                </button>

                <nav className="flex flex-1 flex-col gap-2">

                    {navigationItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={closeOnMobile}
                            title={isCollapsed ? label : undefined}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                                    isCollapsed ? "md:justify-center" : "",
                                    isActive
                                        ? "bg-emerald-700 text-white shadow-sm shadow-emerald-950/20"
                                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                                ].join(" ")
                            }
                        >
                            <Icon className="size-4 shrink-0" aria-hidden="true" />
                            <span className={isCollapsed ? "md:hidden" : ""}>
                                {label}
                            </span>
                        </NavLink>
                    ))}

                </nav>

                <button
                    type="button"
                    onClick={handleSignOut}
                    title={isCollapsed ? "Sign out" : undefined}
                    className={[
                        "mt-auto flex shrink-0 items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/8 hover:text-white",
                        isCollapsed ? "md:justify-center" : ""
                    ].join(" ")}
                >
                    <LogOut className="size-4 shrink-0" aria-hidden="true" />
                    <span className={isCollapsed ? "md:hidden" : ""}>
                        Sign out
                    </span>
                </button>

            </aside>
        </>
    );
}

export default Sidebar;
