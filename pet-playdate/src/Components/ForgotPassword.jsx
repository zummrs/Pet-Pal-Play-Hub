import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import email_icon from './Assets/email.png';
import dog from './Assets/dog.jpg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Function to map Firebase error codes to user-friendly error messages
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

  // Function to handle the password reset process
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      // Send a password reset email to the provided email address
      await auth.sendPasswordResetEmail(email);
      setSuccessMessage('Password reset email sent successfully.');
    } catch (error) {
      console.error('Password reset error:', error);
      // Handle password reset errors and display appropriate error messages
      setError(mapFirebaseErrorToMessage(error.code));
    }
  };

  return (
    <div className="full-background-container" style={{ backgroundImage: `url(${dog})` }}>
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
    </div>
  );
};

export default ForgotPassword;
