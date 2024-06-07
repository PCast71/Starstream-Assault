import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ 
        token: null,
        isAuthenticated: false,
    });

    const setAuth = (token) => {
        setAuthState({ token, isAuthenticated: !!toekn });
        localStorage.setItem('token', token);
    };

    return (
        <AuthContext.Provider value={{ authState, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };