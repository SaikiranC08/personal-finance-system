import React from 'react'
import { useState } from 'react'
import { login } from '../api/login'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [formData,setFormData] = useState({
        username:'',
        password:''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

        const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/home');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

  return (
    <>
    <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Login for existing users</h1>
            <div className="mb-4 flex flex-col gap-2 border-2 center p-4 rounded-lg w-full max-w-md">
                <label>Username</label>
                <input type="text" name="username" placeholder="enter your username" className="border-2 rounded-md text-center" value={formData.username} onChange={handleChange}></input>
                <label>Password</label>
                <input type="password" name="password" placeholder="enter your password" className="border-2 rounded-md text-center" value={formData.password} onChange={handleChange}  ></input>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Login</button>
                </div>
        </form>
        </div>
    </>
  )
}

export default Login