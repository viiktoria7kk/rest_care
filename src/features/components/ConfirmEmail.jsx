import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ConfirmEmail = ({ setIsAuthenticated }) => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                setMessage('Invalid token');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(`${API_URL}/auth/sign-up`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { accessToken, refreshToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setIsAuthenticated(true);
                navigate('/booking');
            } catch (error) {
                console.error('Email confirmation error:', error);
                setMessage('Oops, something went wrong. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        confirmEmail();
    }, [setIsAuthenticated, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#f0f4f8',
                textAlign: 'center',
                padding: '50px',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                gap: 2,
            }}
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <Typography variant="h5" gutterBottom>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

ConfirmEmail.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default ConfirmEmail;