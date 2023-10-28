import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

// db
import { playdatesCollectionRef } from '../firebase/firebase';  // ref to playdates collection in firestore(db)
import 'firebase/compat/firestore';
import { addDoc, getDocs } from 'firebase/firestore';

// image storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#FFBF00',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  playdateList: {
    marginTop: '20px',
  },
  playdateItem: {
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
      img: imageUrl // store url (img src)
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
        <div>Hello, {username}</div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Schedule a Playdate</h2>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Owner</label>
        <input
          type="text"
          name="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label}>Pet Name</label>
        <input
          type="text"
          name="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label}>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label}>Date</label>
        <input
          type="date"
          name="date"
          value={newPlaydate.date}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <label style={styles.label}>Time</label>
        <input
          type="time"
          name="time"
          value={newPlaydate.time}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <label style={styles.label}>Please upload a picture of your pet</label>
        <input
          type="file"
          accept="image/*" 
          onChange={handleImageChange} 
          style={styles.input}
        />
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
