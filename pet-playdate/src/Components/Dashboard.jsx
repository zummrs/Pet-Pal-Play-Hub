import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase';


export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/login");

    };

  return (
    <div>
        <div>Dashboard</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
