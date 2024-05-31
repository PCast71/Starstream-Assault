import React, { useState } from "react";
import AuthService from '../services/AuthService';
import './Auth.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confrimPassword) {
            setMessage('Passwords do not match');
            return;
        }
         
        try {
            const response = await AuthService.SignUp({ username, password });
            setMessage(response.message);
        } catch (error) {
            setMessage(error.response.data.error || 'Server error');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={{handleSignUp}}>
                <h2>Enlist Now</h2>
                <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                />
                <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <input 
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                required
                />
                <button type='submit'>Submit</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default SignUp;

// Handles players account set up -PC
