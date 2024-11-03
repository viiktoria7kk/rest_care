import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getAccessToken } from '../api/authApi.jsx';

const FormWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const EditProfileForm = ({ profileData, onClose }) => {
    const [formData, setFormData] = useState({
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        email: profileData.email || '',
        car: profileData.car || '',
        date_of_birth: profileData.date_of_birth ? new Date(profileData.date_of_birth).toISOString().split('T')[0] : '',
        sex: profileData.sex || '',
    });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getAccessToken();

        const updatedData = {
            ...formData,
            date_of_birth: new Date(formData.date_of_birth)
        };

        try {
            console.log('Updating profile:', updatedData);
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/update`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
                window.location.reload();
                onClose();
            }, 3000);

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <FormWrapper component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">Edit Profile</Typography>
            {showSuccessAlert && <Alert severity="success">Profile updated successfully!</Alert>}

            <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Car"
                name="car"
                value={formData.car}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
        </FormWrapper>
    );
};

EditProfileForm.propTypes = {
    profileData: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        email: PropTypes.string,
        car: PropTypes.string,
        date_of_birth: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        sex: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditProfileForm;