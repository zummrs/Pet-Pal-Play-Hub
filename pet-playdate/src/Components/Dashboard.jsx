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
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '5px',
  },
  button: {
    padding: '10px',
    backgroundColor: ' #FFBF00',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  playdateList: {
    marginTop: '20px',
  },
  playdateItem: {
    backgroundColor: 'lightgray',
    padding: '10px',
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const Dashboard = () => {
  // declare local vars
  const [username] = useState('User'); // Remove owner's name
  const [petName, setPetName] = useState('');
  const [playdates, setPlaydates] = useState([]);
  const [newPlaydate, setNewPlaydate] = useState({
    date: '',
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

        // local
        setPlaydates(playdatesData);

    };

    fetchData();
  }, []);


  const handlePlaydateSubmit = async () => {
    // Here, you should send the new playdate information to your backend or data source
    // and then update the playdates state with the newly created playdate.


    // check if fields are empty
    if (!petName || !newPlaydate.date || !image) {
      // Display an error message or handle the validation as needed
      alert('Pet Name and Date are required fields.');
      return; // Prevent submission
    }

    // create a ref to storage w/ image name, then upload and get the url
    const storageRef = ref(storage, 'images/' + image.name);
    uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    

    // For this example, let's assume the backend sends back the new playdate with an ID.
    const newPlaydateWithId = {
      petName,
      date: newPlaydate.date,
      id: playdates.length + 1, // You should adjust this according to your backend logic.
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
        <label style={styles.label}>Pet Name</label>
        <input
          type="text"
          name="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
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
              <div>Pet: {playdate.petName}</div>
              <div>Date: {playdate.date}</div>
              <img src={playdate.img} width="200" height="200" alt="Playdate"/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
