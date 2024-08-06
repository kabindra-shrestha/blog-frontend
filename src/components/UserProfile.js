import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({ bio: '', profilePicture: '' });
  const history = useNavigate();

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleUpdateProfile = () => {
    axios.put('/api/profile', user)
      .then(response => history.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Profile</h1>
      <input
        type="text"
        placeholder="Bio"
        value={user.bio}
        onChange={e => setUser({ ...user, bio: e.target.value })}
      />
      <input
        type="file"
        onChange={e => setUser({ ...user, profilePicture: e.target.files[0] })}
      />
      <button onClick={handleUpdateProfile}>Update</button>
    </div>
  );
};

export default UserProfile;
