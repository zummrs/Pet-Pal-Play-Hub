import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';

// Import Firestore related functions and references
import { playdatesCollectionRef } from '../firebase/firebase';  // ref to playdates collection in firestore(db)
import 'firebase/compat/firestore';
import { addDoc, getDocs } from 'firebase/firestore';
import './Profile.css'

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
  // const handleSchedulePlaydate = () => {
  //   navigate('/'); // Redirect to the playdate scheduling page
  // };
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
  <div className="profile-container">
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

    <h2 className='welcome-message'>Welcome back {username}.</h2>
    <div className="input-container">
      <label className="label">Username</label>
      <input
        type="text"
        className="input"
        value={username}
        readOnly
      />
      <label className="label">Name</label>
      <input
        type="text"
        className="input"
        name="ownerName"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <label className="label">Location</label>
      <input
        type="text"
        className="input"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label className="label">Pet Name</label>
      <input
        type="text"
        className="input"
        name="petName"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
      />
      <label className="label">Pet Age</label>
      <input
        type="number"
        className="input"
        name="petAge"
        value={petAge}
        onChange={(e) => setPetAge(e.target.value)}
      />
      <label className="label">Pet Weight</label>
      <input
        type="number"
        className="input"
        name="petWeight"
        value={petWeight}
        onChange={(e) => setPetWeight(e.target.value)}
      />
      <label className="label">Pet Size</label>
      <select
        value={petSize}
        onChange={(e) => setPetSize(e.target.value)}
        className="input"
        name="petSize"
      >
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
      <label className="label">Pet Type</label>
      <select
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
        className="input"
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
      <label className="label">Is {petName} vaccinated?</label>
      <select
        value={vaccinated}
        onChange={(e) => setVaccinated(e.target.value)}
        className="input"
        name="petVaccinated"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label className="label">What best describes {petName}?</label>
      <select
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
        className="input"
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
      <label className="label">Is {petName} friendly with people?</label>
      <select
        value={petFriendlyPeople}
        onChange={(e) => setPetFriendlyPeople(e.target.value)}
        className="input"
        name="petFriendlyPeople"
      >
        <option value="Extremely Friendly">{petName} loves people!</option>
        <option value="Pretty Friendly">
          {petName} is pretty good around people
        </option>
        <option value="Kinda Friendly">{petName} is alright with most people</option>
        <option value="Not Friendly">{petName} is not that great with people</option>
        <option value="Unfriendly">Careful, {petName} hates people</option>
        <option value="Extremely Unfriendly">
          {petName} ate a kid once
        </option>
      </select>
      <label className="label">Is {petName} friendly with other pets?</label>
      <select
        value={petFriendly}
        onChange={(e) => setPetFriendly(e.target.value)}
        className="input"
        name="petFriendly"
      >
        <option value="Extremely Friendly">
          {petName} loves meeting other pets!
        </option>
        <option value="Pretty Friendly">
          {petName} is normally well behaved around other pets
        </option>
        <option value="Kinda Friendly">{petName} is okay around other pets</option>
        <option value="Not Friendly">{petName} reacts poorly to other pets</option>
        <option value="Unfriendly">
          {petName} is afraid of/aggressive towards other pets
        </option>
        <option value="Extremely Unfriendly">
          {petName} has slaughtered millions
        </option>
      </select>
      <label className="label">Does {petName} have a favorite toy?</label>
      <input
        type="text"
        name="favoriteToy"
        value={favoriteToy}
        onChange={(e) => setFavoriteToy(e.target.value)}
        className="input"
      />
      <label className="label">Does {petName} have a favorite food/treat?</label>
      <input
        type="text"
        name="favoriteTreat"
        value={favoriteTreat}
        onChange={(e) => setFavoriteTreat(e.target.value)}
        className="input"
      />
      <label className="label">
        How many successful playdates has {petName} had?
      </label>
      <input
        type="number"
        name="numPlaydates"
        value={numPlaydates}
        onChange={(e) => setNumPlaydates(e.target.value)}
        className="input"
      />
          <button  className="button">
      Save Changes
    </button>
    </div>
  </div>
);
};

export default Profile;