function Navbar() {

    return (

        <div className="h-16 bg-white shadow px-6 flex items-center justify-between">

            <h1 className="text-xl font-semibold">
                Dashboard
            </h1>

            <button className="bg-green-500 text-white px-4 py-2 rounded">

                Add Expense

            </button>

        </div>
    );
}

export default Navbar;