import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';

export const Profile = () => {
  return (
    <div>Welcome to my profile page</div>
  )
}

export default Profile