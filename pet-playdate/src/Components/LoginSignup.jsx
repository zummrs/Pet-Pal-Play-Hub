import React, { useState } from 'react';
import './LoginSignup.css';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom'

import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Handle successful login
      navigate("/")
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Signup button clicked');
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Signup successful:', userCredential);
      navigate("/")
      // Handle successful signup, if needed
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? null : (
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
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
      {action === 'Sign Up' ? null : (
        <div className='forgot-password'>
          Forgot Password? <span>Click Here</span>
        </div>
      )}
      <div className='submit-container'>
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={(e) => {
            // console.log('Login button clicked');
            setAction('Login');
            handleLogin(e);
          }}
        >
          Login
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={(e) => {
            // console.log('Sign Up button clicked');
            setAction('Sign Up');
            handleSignup(e);
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};
