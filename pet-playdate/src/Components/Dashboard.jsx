import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase';
// import { updateCurrentUser } from 'firebase/auth';


export const Dashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/login");

    };

    useEffect(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUsername(currentUser.displayName || 'User');
      }
    }, []);

  return (
    <div>
        <div>Hello, {username}</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
