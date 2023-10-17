import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import user_icon from './Assets/person.png'



const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const mapFirebaseErrorToMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Signup button clicked');
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Signup successful:', userCredential);
  
      const user = userCredential.user;
  
      await updateProfile(user, { displayName: username });
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      setError(mapFirebaseErrorToMessage(error.code));
    }
  };
  
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
      <div className='input'>
          <img src={user_icon} alt='' />
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
      <div className='error-message'>
        {error && <span>{error}</span>}
      </div>
      <div className='submit-container'>
        <div
          className='submit'
          onClick={(e) => {
            handleSignup(e);
          }}>
          Sign Up
        </div>
      </div>
      <div className='login-link'>
        <span>Already have an account? </span>
        <Link to='/login'>Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
