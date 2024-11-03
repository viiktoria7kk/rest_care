import React, {useEffect, useState} from 'react';
import {
    Container,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
    Typography,
    Grid,
    IconButton
} from '@mui/material';
import styled from 'styled-components';
import {Email, DirectionsCar, CalendarToday, Wc} from '@mui/icons-material';
import axios from 'axios';
import {getAccessToken} from '../features/api/authApi.jsx';
import {useNavigate} from 'react-router-dom';
import EditProfileForm from '../features/components/EditProfileForm.jsx';

const avatarOptions = [
    '/avatar-1-svgrepo-com.svg',
    '/avatar-4-svgrepo-com.svg',
    '/avatar-6-svgrepo-com.svg',
    '/avatar-7-svgrepo-com.svg',
    '/avatar-winter-custome-22-svgrepo-com.svg'
];

const ProfileWrapper = styled.div`
    background: #fdf9f4;
    max-width: 750px;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
`;

const InfoBox = styled.div`
    background: #faf3eb;
    padding: 20px;
    margin: 8px;
    border-radius: 16px;
    flex: 1 1 100%;
    min-width: 260px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
        background-color: #f5ede5;
    }
`;

const StyledTypography = styled(Typography)`
    display: flex;
    align-items: center;
    color: #4a4a4a;
    font-weight: 500;
    margin-bottom: 10px;
`;

const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState('/avatar-winter-custome-22-svgrepo-com.svg');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            navigate('/');
            return;
        }


        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setProfileData(response.data);
                setSelectedAvatar(response.data.avatar || selectedAvatar);
            } catch (error) {
                console.error('Помилка завантаження даних профілю:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [navigate, selectedAvatar]);

    const handleDeleteProfile = async () => {
        const token = getAccessToken();
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/delete`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Помилка видалення профілю:', error);
        }
    };

    const handleAvatarSelect = async (avatar) => {
        const token = getAccessToken();
        try {
            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/users/update-avatar`,
                { avatar: avatar },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedAvatar(avatar);
            setShowSuccessAlert(true);
            setOpenAvatarDialog(false);
        } catch (error) {
            console.error('Помилка оновлення аватару:', error);
        }
    };

    if (loading) return <div>Завантаження...</div>;

    return (
        <Container maxWidth="md">
            <ProfileWrapper>
                {isEditing ? (
                    <EditProfileForm profileData={profileData} onClose={() => setIsEditing(false)} />
                ) : (
                    <>
                        <Avatar
                            alt={`${profileData?.first_name} ${profileData?.last_name}`}
                            src={selectedAvatar}
                            sx={{ width: 120, height: 120, mb: 2, borderRadius: '50%' }}
                        />
                        <Button variant="outlined" onClick={() => setOpenAvatarDialog(true)}>
                            Змінити аватар
                        </Button>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {profileData?.first_name} {profileData?.last_name}
                        </Typography>
                        <InfoBox>
                            <StyledTypography><Email sx={{ mr: 1 }} /> Email: {profileData?.email}</StyledTypography>
                            <StyledTypography><CalendarToday sx={{ mr: 1 }} /> Дата народження: {profileData?.date_of_birth}</StyledTypography>
                            <StyledTypography><DirectionsCar sx={{ mr: 1 }} /> Автомобіль: {profileData?.car}</StyledTypography>
                            <StyledTypography><Wc sx={{ mr: 1 }} /> Стать: {profileData?.sex}</StyledTypography>
                        </InfoBox>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
                            Редагувати профіль
                        </Button>
                        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                            Видалити профіль
                        </Button>
                    </>
                )}
                <Snackbar open={showSuccessAlert} autoHideDuration={6000} onClose={() => setShowSuccessAlert(false)}>
                    <Alert onClose={() => setShowSuccessAlert(false)} severity="success" sx={{ width: '100%' }}>
                        Аватар успішно оновлено!
                    </Alert>
                </Snackbar>
                <Dialog open={openAvatarDialog} onClose={() => setOpenAvatarDialog(false)}>
                    <DialogContent>
                        <Typography variant="h6">Виберіть новий аватар</Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {avatarOptions.map((avatar) => (
                                <Grid item xs={4} key={avatar}>
                                    <IconButton onClick={() => handleAvatarSelect(avatar)}>
                                        <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
                                    </IconButton>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAvatarDialog(false)}>Скасувати</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Підтвердження видалення профілю</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ви впевнені, що хочете видалити свій профіль? Ця дія не може бути скасована.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Скасувати</Button>
                        <Button onClick={handleDeleteProfile} color="error">Видалити</Button>
                    </DialogActions>
                </Dialog>
            </ProfileWrapper>
        </Container>
    );
};

export default UserProfile;