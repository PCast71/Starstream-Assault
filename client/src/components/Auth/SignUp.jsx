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
        
    )
}
