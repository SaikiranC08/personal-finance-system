import { useState } from 'react'
import { signup } from '../api/signup'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        phoneNumber: ''
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

    console.log("Signup button clicked", formData);

    try {

        await signup(formData);

        navigate('/home');

    } catch(error) {

        console.log(error);

    }
};

  return (
    <>
    <div className="h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-800">Fill the form to sign up</h1>
   <div className="mb-4 flex flex-col gap-2 border-2 center p-4 rounded-lg w-full max-w-md">
    <label>Username : </label>
    <input type="text" name="userName" placeholder="enter your username" className="border-2 rounded-md text-center" value={formData.userName} onChange={handleChange}></input>
    <label>Email : </label>
    <input type="email" name="email" placeholder="enter your email" className="border-2 rounded-md text-center" value={formData.email} onChange={handleChange}></input>
    <label>Password : </label>
    <input type="password" name="password" placeholder="enter your password" className="border-2 rounded-md text-center" value={formData.password} onChange={handleChange}></input>
    <label>Phone Number : </label>
    <input type="tel" placeholder="enter your phone number" className="border-2 rounded-md text-center" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}></input>
    <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Sign Up</button>

    </div>
    </form>

    
    </div>
    </>
  )
}

export default Signup
