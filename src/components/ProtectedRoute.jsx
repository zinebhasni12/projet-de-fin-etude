import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
    const { isAuthenticated, role } = useContext(AuthContext);

    const hasAccess = (role === 'admin') || (role === roleRequired);

    if (!isAuthenticated || !hasAccess) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
