
import { useNavigate } from 'react-router-dom';
// Import Firestore related functions and references
import { auth } from '../firebase/firebase';
import 'firebase/compat/firestore';
import './AboutPage.css'

const AboutPage = () => {

const navigate = useNavigate();
const handleLogout = () => {
    auth.signOut(); // Sign the user out
    navigate('/login'); // Redirect to the login page
  };
  
  return (
    <div className="about-container">
        <div className="navbar">
        <button onClick={() => navigate('/profile')} className="navbar-link">
        Profile
        </button>
        <button onClick={() => navigate('/')} className="navbar-link">
        Schedule Playdate
        </button>
        <button onClick={handleLogout} className="navbar-link">
        Logout
        </button>
        <button onClick={() => navigate('/aboutpage')} className="navbar-link">
        About
        </button>
        </div>
      <h2 className='about-heading'>About Pet Playdate Scheduler</h2>
      <p className='about-content'>
        The <strong>PlayPalsPlayHub</strong> is a web application designed to bring pet owners together and make it easy for them to schedule playdates for their beloved pets.
      </p>
      <p className='about-content'>
        Our platform offers a range of features, including user authentication, user profiles, pet playdate scheduling, and pet matchmaking. We believe that pets need social interactions and that connecting with other pet owners can promote the well-being of our furry friends.
      </p>
      <h3 className='about-content'>Key Features</h3>
      <ul>
        <li>User Registration and Authentication</li>
        <li>Creating User and Pet Profiles</li>
        <li>Scheduling Pet Playdates</li>
        <li>Pet Matchmaking for Playdates</li>
      </ul>
      <h3>Technologies Used</h3>
      <p>
        The Pet Playdate Scheduler is built with a modern technology stack, including React for the frontend, Firebase for the backend, and Firestore for the database.
      </p>
      <h3>Project Team</h3>
      <p>
        The project was developed by a dedicated team of individuals who are passionate about bringing pet owners and their pets together.
      </p>
      <ul>
        <li>Jonathan Luu - Team Lead</li>
        <li>Christian Lara - Team Member</li>
        <li>Gregory Sanchez - Team Member</li>
        <li>Andrew Higa - Team Member</li>
      </ul>
      <h3>Feedback and Contributions</h3>
      <p className="about-content">
        For feedback and contributions, please visit our{' '}
        <a href="https://github.com/gls1993/349-Group-Project" className="about-link">
          GitHub repository
        </a>.
      </p>
    </div>
  );
};

export default AboutPage;