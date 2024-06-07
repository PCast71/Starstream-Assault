import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', { username, password });
      setAuth(res.data.token); 
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
// Handles players account set up -PC
