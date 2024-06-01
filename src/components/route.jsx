import React, {useState} from 'react';
import {Navigate, Route, Router, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./login.jsx";
import AdminPage from "./AdminPage.jsx";

const Routelist = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const users = {
        admin: {
            username: "admin",
            password: "admin123",
            nom: "Dupont",
            prenom: "Jean",
            adresse: "123 Rue de l'Admin",
            role: "Administrateur",
            telephone: "0102030405"
        },
        client: {
            username: "client",
            password: "client123",
            nom: "Durand",
            prenom: "Marie",
            adresse: "456 Rue du Client",
            role: "Client",
            telephone: "0607080910"
        }
    };

    const handleLogin = (username, password) => {
        const user = Object.values(users).find(u => u.username === username && u.password === password);
        if (user) {
            setIsAuthenticated(true);
            setUserRole(user.role);
        } else {
            alert("Identifiants incorrects");
        }
    };
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuthenticated && userRole === 'Administrateur' ? <AdminPage /> : <Navigate to="/" />} />
                {/* Redirige toutes les autres routes non définies */}
                <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default Routelist;
