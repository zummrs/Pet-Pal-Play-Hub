import React from 'react';
import './App.css';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from './Components/Dashboard';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" Component={Dashboard} />
          <Route path='/loginsignup' Component={LoginSignup} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
