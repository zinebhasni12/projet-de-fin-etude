// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null, // Ajoutez un champ pour les informations de l'utilisateur
        role: null
    });

    const login = (user) => {
        setAuthState({ isAuthenticated: true, user, role: user.role });
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null, role: null });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
