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
  // declare local vars
  const [username, setUsername] = useState(''); // Remove owner's name
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

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  // input handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlaydate({
      ...newPlaydate,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  
  // fetch playdates from firestore -> setPlaydates
  useEffect(() => {
    const fetchData = async () => {
        // queries curr snapshot of collecion
        const querySnapshot = await getDocs(playdatesCollectionRef);
        const playdatesData = [];

        // loops through query
        querySnapshot.forEach((doc) => {
          playdatesData.push({ id: doc.id, ...doc.data() });
        });
        
        const currentUser = auth.currentUser;
        if(currentUser){
          setUsername(currentUser.displayName);
        }

        // local
        setPlaydates(playdatesData);

    };

    fetchData();
  }, []);


  const handlePlaydateSubmit = async () => {
    // Here, you should send the new playdate information to your backend or data source
    // and then update the playdates state with the newly created playdate.
    
    // Users email is stored on submission
    const userEmail = auth.currentUser.email;
    const userName = auth.currentUser.displayName

    // check if fields are empty
    if (!ownerName || !petName || !location || !newPlaydate.date || !image) {
      // Display an error message or handle the validation as needed
      alert('All fields required.');
      return; // Prevent submission
    }

    // create a ref to storage w/ image name, then upload and get the url
    const storageRef = ref(storage, 'images/' + image.name);
    uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    

    const timeConversion = (timeConverted) => {
      const [hours, minutes] = timeConverted.split(':');
      const amPm = hours >= 12 ? "PM" : "AM";
      const hoursFormat = (hours % 12) || 12;

      return `${hoursFormat}:${minutes} ${amPm}`;
    };
    // For this example, let's assume the backend sends back the new playdate with an ID.
    const newPlaydateWithId = {
      ownerName, 
      petName,
      location,
      date: newPlaydate.date,
      id: playdates.length + 1, // You should adjust this according to your backend logic.
      time: timeConversion(newPlaydate.time), 
      img: imageUrl, // store url (img src)
      email: userEmail,
      listedUserName: userName,
    };


    // post submission to firestore
    await addDoc(playdatesCollectionRef, newPlaydateWithId)
     
    // update local
    setPlaydates([...playdates, newPlaydateWithId]);

    // Clear the form
    setNewPlaydate({
      date: '',
      image: null,
    });
    
  };

  const handleContactClick = (ownerEmail) => {
    const subject = 'Regarding Your Pet Listing';
    const body = 'Hello, I am interested in meeting up for your listed playdate!';
  
    const mailtoLink = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // You can optionally set the username here, but we're not using it in this example.
      // setUsername(currentUser.displayName || 'User');
    }
  }, []);


  // sort local playdates[] by date
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
