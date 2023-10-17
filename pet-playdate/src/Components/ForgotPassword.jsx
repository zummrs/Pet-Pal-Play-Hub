import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import email_icon from './Assets/email.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const mapFirebaseErrorToMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      setSuccessMessage('Password reset email sent successfully.');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(mapFirebaseErrorToMessage(error.code));
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Reset Password</div>
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
        </div>
      <div className='error-message'>
        {error && <span>{error}</span>}
      </div>
      <div className='success-message'>
        {successMessage && <span>{successMessage}</span>}
      </div>
      <div className='submit-container'>
        <div
          className='submit'
          onClick={(e) => {
            handlePasswordReset(e);
          }}
        >
          Reset
        </div>
      </div>
      <div className='login-link'>
        <span>Remembered your password? </span>
        <Link to='/login'>Login here</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;