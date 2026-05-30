import { useLocation } from "react-router-dom";

const pageMeta = [
    {
        match: /^\/home\/?$/,
        title: "Dashboard",
        subtitle: "Overview of your financial activity"
    },
    {
        match: /^\/expenses(\/.*)?$/,
        title: "Expenses",
        subtitle: "Manage your transactions"
    },
    {
        match: /^\/analytics(\/.*)?$/,
        title: "Analytics",
        subtitle: "Track spending insights and trends"
    },
    {
        match: /^\/reports(\/.*)?$/,
        title: "Reports",
        subtitle: "Generate financial export documents"
    },
    {
        match: /^\/funds(\/.*)?$/,
        title: "Funds",
        subtitle: "Track shared and personal funds"
    }
];

function getPageMeta(pathname) {
    return pageMeta.find((item) => item.match.test(pathname)) || pageMeta[0];
}

function getUserInitial(username) {
    return username?.trim()?.charAt(0)?.toUpperCase() || "F";
}

function Navbar() {

    const { pathname } = useLocation();
    const { title, subtitle } = getPageMeta(pathname);
    const username = localStorage.getItem("username") || "FundFlow user";
    const currentDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date());

    return (

        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">

            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">

                <div className="min-w-0">
                    <h1 className="truncate text-2xl font-semibold tracking-normal text-slate-950">
                        {title}
                    </h1>

                    <p className="mt-1 truncate text-sm text-slate-500">
                        {subtitle}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 sm:block">
                        {currentDate}
                    </div>

                    <div
                        className="flex size-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700"
                        title={username}
                    >
                        {getUserInitial(username)}
                    </div>
                </div>

            </div>

        </header>
    );
}

export default Navbar;
