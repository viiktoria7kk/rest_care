import { useState, useEffect, useCallback } from 'react';
import { refreshToken } from '../utils/auth.jsx';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => refreshToken(handleLogout), 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, [handleLogout]);

    return { isAuthenticated, setIsAuthenticated, handleLogout };
};

export default useAuth;