import React from 'react';
import { Button } from '@mui/material';
import axiosInstance from '../api/axiosInstance.jsx';
import PropTypes from 'prop-types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const LogoutButton = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axiosInstance.post(`${API_URL}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.clear();
            onLogout();
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Button color="inherit" onClick={handleLogout}>
            Вийти
        </Button>
    );
};

LogoutButton.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;