import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import user_icon from './Assets/person.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [emailVerification, setEmailVerification] = useState(false);
  const navigate = useNavigate();

  // Function to map Firebase error codes to user-friendly error messages
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

  // Function to handle the signup process
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Signup button clicked');
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Signup successful:', userCredential);
  
      const user = userCredential.user;

      // Send an email verification to the user
      await user.sendEmailVerification();
      setEmailVerification(true);

      // Update the user's profile with the provided username
      await updateProfile(user, { displayName: username });

      // Redirect to the home page or another destination after successful signup
      // navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup errors and display appropriate error messages
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
      {emailVerification ? (
        <div className='verification-message'>
          Verification email sent! Please check your email and verify your account.
        </div>
      ) : null}
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
