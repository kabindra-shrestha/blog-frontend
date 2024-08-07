import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = () => {
    axios.post('/api/user/account/v1/users/login', { username, password })
      .then(response => {
        // Save token to local storage or state
        localStorage.setItem("accessToken", response.access_token);
        
        history.push('/home');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
