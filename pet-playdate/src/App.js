import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Forgotpassword from './Components/ForgotPassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" Component={Dashboard} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
          <Route path='/forgotpassword' Component={Forgotpassword} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
