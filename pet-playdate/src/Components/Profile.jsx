import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';

// Import Firestore related functions and references
import { playdatesCollectionRef } from '../firebase/firebase';  // ref to playdates collection in firestore(db)
import 'firebase/compat/firestore';
import { addDoc, getDocs } from 'firebase/firestore';


// Styles for components
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
    backgroundColor: 'transparent',
  },
  inputHover: {
    backgroundColor: '#d3d3d3',
    cursor: "pointer",
  },
  button: {
    padding: '12px',
    backgroundColor: '#FFBF00',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  postName: {
    fontSize: 14,
    fontWeight: 'normal',

  },
};

export const Profile = () => {
  // Define states to manage user profile data
  const [username, setUsername] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [location, setLocation] = useState('');
  const [petName, setPetName] = useState('[Your Pet]');
  const [petAge, setPetAge] = useState(0);
  const [petWeight, setPetWeight] = useState(0);
  const [petSize, setPetSize] = useState('');
  const [petType, setPetType] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [personality, setPersonality] = useState('');
  const [petFriendlyPeople, setPetFriendlyPeople] = useState('');
  const [petFriendly, setPetFriendly] = useState('');
  const [favoriteToy, setFavoriteToy] = useState('');
  const [favoriteTreat, setFavoriteTreat] = useState('');
  const [numPlaydates, setNumPlaydates] = useState(0);
    // Get a reference to the navigation function for routing
  const navigate = useNavigate();
   // Function to handle user logout
  const handleLogout = () => {
    auth.signOut(); // Sign the user out
    navigate('/login'); // Redirect to the login page
  };
  // Function to navigate to the playdate scheduling page
  const handleSchedulePlaydate = () => {
    navigate('/'); // Redirect to the playdate scheduling page
  };
  // Fetch and display user data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if(currentUser){
        setUsername(currentUser.displayName);
      }
    };

    fetchData();
  });

  return (
    <div style={styles.container}>
      <div>
        <div>Welcome to your profile, {username}!</div>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
        <button onClick={handleSchedulePlaydate} style={styles.button}>Schedule a Playdate!</button>
      </div>

      <h2>{username}'s Profile</h2>
      <div style={styles.inputContainer}>
          {/* Render input fields and labels for various user profile data */}
        <label style={styles.label}>Username</label>
        <text style={styles.input}>
          {username}
        </text>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Pet Name</label>
        <input
          type="text"
          name="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Pet Age</label>
        <input
          type="number"
          name="petAge"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Pet Weight</label>
        <input
          type="number"
          name="petWeight"
          value={petWeight}
          onChange={(e) => setPetWeight(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Pet Size</label>
        <form>
          <select
            value={petSize}
            onChange={(e) => setPetSize(e.target.value)}
            style={styles.input}
            name="petSize"
            >
            <option value="Small">Small</option>  
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </form>
        <label style={styles.label}>Pet Type</label>
        <form>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            style={styles.input}
            name="petType"
            >
            <option value="Dog">Dog</option>  
            <option value="Cat">Cat</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Bird</option>
            <option value="Reptile">Reptile</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Poultry Bird">Poultry Bird</option>
            <option value="Hamster">Hamster</option>
            <option value="Guinea Pig">Guinea Pig</option>
            <option value="Ferret">Ferret</option>
            <option value="Other">Other</option>
          </select>
        </form>
        <label style={styles.label}>Is {petName} vaccinated?</label>
        <form>
          <select
            value={vaccinated}
            onChange={(e) => setVaccinated(e.target.value)}
            style={styles.input}
            name="petVaccinated"
            >
            <option value="Small">Yes</option>  
            <option value="Medium">No</option>
          </select>
        </form>
        <label style={styles.label}>What best describes {petName}?</label>
        <form>
          <select
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            style={styles.input}
            name="personality"
            >
            <option value="Obedient">Obedient</option>  
            <option value="Protective">Protective</option>
            <option value="Silly">Silly</option>
            <option value="Friendly">Friendly</option>
            <option value="Vigilant">Vigilant</option>
            <option value="Fancy">Fancy</option>
            <option value="Independent">Independent</option>
            <option value="Social">Social</option>
            <option value="Energetic">Energetic</option>
            <option value="Relaxed">Relaxed</option>
          </select>
        </form>
        <label style={styles.label}>Is {petName} friendly with people?</label>
        <form>
          <select
            value={petFriendlyPeople}
            onChange={(e) => setPetFriendlyPeople(e.target.value)}
            style={styles.input}
            name="petFriendlyPeople"
            >
            <option value="Extremely Friendly">{petName} loves people!</option>  
            <option value="Pretty Friendly">{petName} is pretty good around people</option>
            <option value="Kinda Friendly">{petName} is alright with most people</option>
            <option value="Not Friendly">{petName} is not that great with people</option>
            <option value="Unfriendly">Careful, {petName} hates people</option>
            <option value="Extremely Unfriendly">{petName} ate a kid once</option>
          </select>
        </form>
        <label style={styles.label}>Is {petName} friendly with other pets?</label>
        <form>
          <select
            value={petFriendly}
            onChange={(e) => setPetFriendly(e.target.value)}
            style={styles.input}
            name="petFriendly"
            >
            <option value="Extremely Friendly">{petName} loves meeting other pets!</option>  
            <option value="Pretty Friendly">{petName} is normally well behaved around other pets</option>
            <option value="Kinda Friendly">{petName} is okay around other pets</option>
            <option value="Not Friendly">{petName} reacts poorly to other pets</option>
            <option value="Unfriendly">{petName} is afraid of/aggressive towards other pets</option>
            <option value="Extremely Unfriendly">{petName} has slaughtered millions</option>
          </select>
        </form>
        <label style={styles.label}>Does {petName} have a favorite toy?</label>
        <input
          type="text"
          name="favoriteToy"
          value={favoriteToy}
          onChange={(e) => setFavoriteToy(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Does {petName} have a favorite food/treat?</label>
        <input
          type="text"
          name="favoriteTreat"
          value={favoriteTreat}
          onChange={(e) => setFavoriteTreat(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>How many successful playdates has {petName} had?</label>
        <input
          type="number"
          name="numPlaydates"
          value={numPlaydates}
          onChange={(e) => setNumPlaydates(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={handleSchedulePlaydate} style={styles.button}>
        Schedule a Playdate!
      </button>
    </div>
  )
}

export default Profile