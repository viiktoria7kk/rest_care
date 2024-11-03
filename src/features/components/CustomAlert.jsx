import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomAlert = ({ message, type = 'success' }) => {
    const backgroundColor = type === 'error' ? '#f44336' : '#4caf50';
    const icon = type === 'error' ? '❌' : '✅';

    return (
        <Box
            sx={{
                backgroundColor,
                color: '#fff',
                padding: '13px',
                borderRadius: '4px',
                textAlign: 'center',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
            }}
        >
            <Typography variant="body1">
                {icon} {message}
            </Typography>
        </Box>
    );
};

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']),
};

export default CustomAlert;