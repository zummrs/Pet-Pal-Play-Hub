import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';

// Import Firestore-related functionality
import { playdatesCollectionRef } from '../firebase/firebase';
import { addDoc, getDocs } from 'firebase/firestore';

// Import Firebase Storage-related functionality
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import './Dashboard.css'


export const Dashboard = () => {
  // declare local vars
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
        // queries current snapshot of collecion
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
      id: playdates.length + 1, // Adjust this according to your backend logic.
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
    <div className="dashboard-container">
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

      <div className="dashboard-content">
        <div className="input-container">
          <h2>Schedule a Playdate</h2>

          {/* Input fields */}
          <label className="label">Owner</label>
          <input
            type="text"
            name="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="input"
            placeholder='Required'
            required
          />

          <label className="label">Pet Name</label>
          <input
            type="text"
            name="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="input"
            placeholder='Required'
            required
          />

          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
            placeholder='Required'
            required
          />

          <label className="label">Date</label>
          <input
            type="date"
            name="date"
            value={newPlaydate.date}
            onChange={handleInputChange}
            className="input"
            required
          />

          <label className="label">Time</label>
          <input
            type="time"
            name="time"
            value={newPlaydate.time}
            onChange={handleInputChange}
            className="input"
            required
          />

          <label className="label">Please upload a picture of your pet</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input"
          />

          <button onClick={handlePlaydateSubmit} className="button">
            Schedule
          </button>
        </div>

        <div className="playdates-container">
          <h2>Upcoming Playdates</h2>


          {/* Scheduled playdates */}
          <ul className="playdateList">
            {playdates.map((playdate) => (
              <li key={playdate.id} className="playdateItem">
                <div>
                  <div>Owner: {playdate.ownerName}</div>
                  <div>Pet: {playdate.petName}</div>
                  <div>Location: {playdate.location}</div>
                  <div>Date: {playdate.date}</div>
                  <div>Time: {playdate.time}</div>
                  <img src={playdate.img} width="200" height="200" alt="Playdate"/>
                  <div style={{fontSize: 14, fontWeight: 'normal', fontStyle: 'italic'}}>Listed By: {playdate.listedUserName}</div>
                  <button onClick={() => handleContactClick(playdate.email)} className="button">
                    Contact
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};