import React from 'react';
import './App.css';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from './Components/Dashboard';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" Component={Dashboard} />
          <Route path='/loginsignup' Component={LoginSignup} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
