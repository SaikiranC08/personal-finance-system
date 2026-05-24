import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear user session (e.g., remove token from localStorage)
        localStorage.removeItem('token');
        localStorage.removeItem('access_token');
        // Redirect to landing page
        navigate("/Landing");
    }
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home