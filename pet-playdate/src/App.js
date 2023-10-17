import React from 'react';
import './App.css';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/loginsignup' Component={LoginSignup} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
