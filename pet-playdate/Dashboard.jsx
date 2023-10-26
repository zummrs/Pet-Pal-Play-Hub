import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

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
  const [username] = useState('User'); // Remove owner's name
  const [petName, setPetName] = useState('');
  const [playdates, setPlaydates] = useState([]);
  const [newPlaydate, setNewPlaydate] = useState({
    date: '',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlaydate({
      ...newPlaydate,
      [name]: value,
    });
  };

  const handlePlaydateSubmit = () => {
    // Here, you should send the new playdate information to your backend or data source
    // and then update the playdates state with the newly created playdate.

    // For this example, let's assume the backend sends back the new playdate with an ID.
    const newPlaydateWithId = {
      petName,
      date: newPlaydate.date,
      id: playdates.length + 1, // You should adjust this according to your backend logic.
    };

    setPlaydates([...playdates, newPlaydateWithId]);

    // Clear the form
    setNewPlaydate({
      date: '',
    });
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // You can optionally set the username here, but we're not using it in this example.
      // setUsername(currentUser.displayName || 'User');
    }
  }, []);

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
        />
        <label style={styles.label}>Date</label>
        <input
          type="date"
          name="date"
          value={newPlaydate.date}
          onChange={handleInputChange}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
