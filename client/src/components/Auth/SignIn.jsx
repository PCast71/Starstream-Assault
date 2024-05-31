import React, { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (result.success) {
            setMessage('Sign-in successful');
        } else {
            setMessage('Sign-in failed: ' + result.message);
        }
    };
    
    return (
        <div className="container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
};

export default SignIn;