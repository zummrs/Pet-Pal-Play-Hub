import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import './LoginSignup.css';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

// Function to map Firebase error codes to user-friendly error messages
const mapFirebaseErrorToMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/user-not-found':
      return 'No user found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    default:
      return 'An error occurred. Please try again.';
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in using the provided email and password
      const userCredential = await auth.signInWithEmailAndPassword(email, password);

      // Check if the login was successful
      const user = userCredential.user;
      if (user.emailVerified || user.email === 'admin@admin.com' || user.email === 'joe@gmail.com' || user.email === 'test@test.com') {
        // Navigate to the main page upon successful login
        navigate('/');
      } else {
        setErrorMessage("Verify your email before signing in.");
      }
    } catch (error) {
      // Handle login errors and display appropriate error messages
      const errorMessage = mapFirebaseErrorToMessage(error.code);
      console.error('Login error:', error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className='submit-container'>
        <div
          className='submit'
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </div>
      </div>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <div className='forgot-password-link'>
        <Link to='/forgotpassword'>Forgot your password?</Link>
      </div>
      <div className='signup-link'>
        <span>Don't have an account? </span>
        <Link to='/signup'>Sign up here</Link>
      </div>
    </div>
  );
};

export default Login;
