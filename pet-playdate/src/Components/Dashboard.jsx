import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

// Import Firestore-related functionality
import { playdatesCollectionRef } from '../firebase/firebase';
import { addDoc, getDocs } from 'firebase/firestore';

// Import Firebase Storage-related functionality
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';

// Define inline CSS styles
const styles = {
  // Container styles
  container: {
    // CSS styles for the container
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },

  // Input container styles
  inputContainer: {
    // CSS styles for the input container
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },

  // Label styles
  label: {
    // CSS styles for labels
    marginBottom: '8px',
    fontWeight: 'bold',
  },

  // Input styles
  input: {
    // CSS styles for inputs
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '15px',
  },

  // Button styles
  button: {
    // CSS styles for buttons
    padding: '12px',
    backgroundColor: '#FFBF00',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },

  // Playdate list styles
  playdateList: {
    // CSS styles for the playdate list
    marginTop: '20px',
    color: 'black',
    fontWeight: 'bold',
  },

  // Individual playdate item styles
  playdateItem: {
    // CSS styles for individual playdate items
    backgroundColor: 'white',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },

  // Post name styles
  postName: {
    // CSS styles for post names
    fontSize: 14,
    fontWeight: 'normal',
  },
};

export const Dashboard = () => {
  // State variables for user information and playdates
  const [username, setUsername] = useState('');
  const [petName, setPetName] = useState('');
  const [location, setLocation] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [playdates, setPlaydates] = useState([]);
  const [newPlaydate, setNewPlaydate] = useState({
    date: '',
    time: '',
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  // Navigate to user profile
  const handleProfile = () => {
    navigate('/profile');
  };

  // Input change handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlaydate({
      ...newPlaydate,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Fetch playdates from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(playdatesCollectionRef);
      const playdatesData = [];

      querySnapshot.forEach((doc) => {
        playdatesData.push({ id: doc.id, ...doc.data() });
      });

      const currentUser = auth.currentUser;
      if (currentUser) {
        setUsername(currentUser.displayName);
      }

      setPlaydates(playdatesData);
    };

    fetchData();
  }, []);

  // Handle playdate submission
  const handlePlaydateSubmit = async () => {
    // Handle playdate submission and Firestore data storage

    // ... (Code for validation, image upload, and data submission)

    // Update local state with the new playdate
  };

  // Handle contacting the owner
  const handleContactClick = (ownerEmail) => {
    // Generate a 'mailto' link for contacting the owner
  };

  // Sort playdates by date
  playdates.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={styles.container}>
      <div>
        <div>Welcome back, {username}</div>
        <button onClick={handleProfile} style={styles.button}>
          Profile
        </button>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>

      <h2>Schedule a Playdate</h2>

      <div style={styles.inputContainer}>
        {/* Owner input */}
        <label style={styles.label}>Owner</label>
        <input
          type="text"
          name="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          style={styles.input}
          required
        />

        {/* Pet name input */}
        <label style={styles.label}>Pet Name</label>
        <input
          type="text"
          name="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          style={styles.input}
          required
        />

        {/* Location input */}
        <label style={styles.label}>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
          required
        />

        {/* Date input */}
        <label style={styles.label}>Date</label>
        <input
          type="date"
          name="date"
          value={newPlaydate.date}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        {/* Time input */}
        <label style={styles.label}>Time</label>
        <input
          type="time"
          name="time"
          value={newPlaydate.time}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        {/* Image upload */}
        <label style={styles.label}>Please upload a picture of your pet</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />

        {/* Playdate submission button */}
        <button onClick={handlePlaydateSubmit} style={styles.button}>
          Schedule
        </button>
      </div>

      <h2>Upcoming Playdates</h2>
      <ul style={styles.playdateList}>
        {playdates.map((playdate) => (
          <li key={playdate.id} style={styles.playdateItem}>
            <div>
              <div>Owner: {playdate.ownerName}</div>
              <div>Pet: {playdate.petName}</div>
              <div>Location: {playdate.location}</div>
              <div>Date: {playdate.date}</div>
              <div>Time: {playdate.time}</div>
              <img src={playdate.img} width="200" height="200" alt="Playdate"/>
              <div style={styles.postName}>Listed By: {playdate.listedUserName}</div>
              {/* Display playdate details and contact button */}
              <button onClick={() => handleContactClick(playdate.email)} style={styles.button}>
                Contact
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
