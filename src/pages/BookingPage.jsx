import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, MenuItem, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const BookingPage = () => {
    const theme = useTheme();
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedParking, setSelectedParking] = useState(null);
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [dialog, setDialog] = useState({ open: false, message: '' });
    const pricePerHour = 2;
    const powerSlotPricePerHour = 3;

    const isBookingActive = timeLeft !== null;

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                const response = await axios.get(`${API_URL}/parking/available-slots`);
                setAvailableSlots(response.data);
            } catch (error) {
                console.error('Error loading slots:', error);
            }
        };
        fetchAvailableSlots();

        const storedBooking = JSON.parse(localStorage.getItem('activeBooking'));
        if (storedBooking) {
            const timeRemaining = new Date(storedBooking.endTime) - Date.now();
            if (timeRemaining > 0) {
                setSelectedParking(storedBooking.slot);
                setTimeLeft(timeRemaining);
                startCountdown(timeRemaining);
            } else {
                localStorage.removeItem('activeBooking');
            }
        }
    }, []);

    const startCountdown = (initialTime) => {
        setTimeLeft(initialTime);
        const timerId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1000) {
                    clearInterval(timerId);
                    localStorage.removeItem('activeBooking');
                    return null;
                }
                return prev - 1000;
            });
        }, 1000);
    };

    const hourOptions = [0, 1, 2, 3, 4, 5, 6, 12, 24, 36, 48, 60, 72, 120, 168];
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

    const handleHourChange = (event) => {
        setHours(parseInt(event.target.value));
    };

    const handleMinuteChange = (event) => {
        setMinutes(parseInt(event.target.value));
    };

    const handleSlotSelection = (slot) => {
        if (!isBookingActive) {
            setSelectedParking(slot);
        }
    };

    const calculateTotalPrice = () => {
        const totalDurationInHours = hours + minutes / 60;
        const slotPricePerHour = selectedParking?.name.includes('Power') ? powerSlotPricePerHour : pricePerHour;
        let totalPrice = totalDurationInHours * slotPricePerHour;
        if (totalDurationInHours > 24) totalPrice *= 0.7;
        return totalPrice.toFixed(2);
    };

    const handleBooking = async () => {
        if (!selectedParking) {
            setDialog({ open: true, message: 'Please select a parking spot before booking.' });
            return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
            setDialog({ open: true, message: 'Please log in to book a parking spot.' });
            return;
        }

        try {
            const totalDurationInMinutes = (hours * 60) + minutes;
            const response = await axios.post(
                `${API_URL}/booking`,
                {
                    slotId: selectedParking.id,
                    duration: totalDurationInMinutes,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                const bookingEndTime = Date.now() + (totalDurationInMinutes * 60 * 1000);
                const activeBooking = { slot: selectedParking, endTime: bookingEndTime };
                localStorage.setItem('activeBooking', JSON.stringify(activeBooking));
                setTimeLeft(bookingEndTime - Date.now());
                startCountdown(bookingEndTime - Date.now());
                setDialog({ open: true, message: `Successfully booked ${selectedParking.name} for ${hours} hours and ${minutes} minutes for ${calculateTotalPrice()} $` });
            } else {
                setDialog({ open: true, message: 'Failed to book the spot. Please try again.' });
            }
        } catch (error) {
            console.error('Error during booking:', error);

            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setDialog({ open: true, message: 'Session expired. Please log in again.' });
                window.location.href = '/login';
            } else {
                setDialog({ open: true, message: 'An error occurred while booking.' });
            }
        }
    };

    const formatTimeLeft = () => {
        if (!timeLeft) return '';
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
        const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
        return `${days}d ${hours}h ${minutes}m`;
    };

    const handleCloseDialog = () => {
        setDialog({ open: false, message: '' });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Card sx={{ p: 2, borderRadius: '12px', marginBottom: '105px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#d4a60d', fontWeight: 'bold' }}>
                        Reserve Parking Place
                    </Typography>

                    {timeLeft ? (
                        <Typography variant="h6" sx={{ color: 'green', mb: 2 }}>
                            {`Time remaining for your booking (${selectedParking?.name}): ${formatTimeLeft()}`}
                        </Typography>
                    ) : (
                        <Typography variant="body1" sx={{ color: '#8c8c8c', mb: 1 }}>
                            Selected parking place: {selectedParking ? selectedParking.name : 'None'}
                        </Typography>
                    )}

                    <Box sx={{ position: 'relative', my: 4 }}>
                        <img src="/parking-map.png" alt="Parking Map" style={{ width: '100%', borderRadius: '8px' }} />
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            {availableSlots.map((slot) => (
                                <Box
                                    key={slot.id}
                                    sx={{
                                        position: 'absolute',
                                        top: `${slot.top}%`,
                                        left: `${slot.left}%`,
                                        width: '80px',
                                        height: '60px',
                                        textAlign: 'center',
                                        backgroundColor: slot.isAvailable ? '#8c7b4f' : '#ccc',
                                        color: '#fff',
                                        lineHeight: '50px',
                                        borderRadius: '4px',
                                        cursor: isBookingActive ? 'not-allowed' : (slot.isAvailable ? 'pointer' : 'not-allowed'),
                                        opacity: slot.isAvailable ? 1 : 0.6,
                                        '&:hover': { backgroundColor: slot.isAvailable ? '#6d5c3b' : '#ccc' },
                                        [theme.breakpoints.down('sm')]: {
                                            width: '60px',
                                            height: '45px',
                                            lineHeight: '25px',
                                        },
                                    }}
                                    onClick={() => slot.isAvailable && handleSlotSelection(slot)}
                                >
                                    {slot.isAvailable ? (
                                        <>
                                            {slot.name.includes('Power') ? (
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        [theme.breakpoints.down('sm')]: {
                                                            fontSize: '8px',
                                                        },
                                                    }}
                                                >
                                                    {slot.name} ⚡️
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        [theme.breakpoints.down('md')]: {
                                                            fontSize: '10px',
                                                        },
                                                    }}
                                                >
                                                    {slot.name}
                                                </span>
                                            )}
                                            {selectedParking?.id === slot.id && (
                                                <Box
                                                    sx={{
                                                        mt: 3,
                                                        fontSize: '12px',
                                                        [theme.breakpoints.down('sm')]: {
                                                            fontSize: '8px',
                                                        },
                                                    }}
                                                >
                                                    SELECTED
                                                </Box>
                                            )}
                                        </>
                                    ) : (
                                        <img
                                            src="/car.svg"
                                            alt="Car"
                                            style={{
                                                width: '60px',
                                                [theme.breakpoints.down('sm')]: {
                                                    width: '45px',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box mb={4}>
                        <Typography variant="body1" sx={{ color: '#8c8c8c', mb: 1 }}>Duration</Typography>
                        <Box display="flex" justifyContent="space-between" mb={3}>
                            <TextField
                                select
                                value={hours}
                                onChange={handleHourChange}
                                fullWidth
                                sx={{ mr: 1 }}
                                variant="outlined"
                            >
                                {hourOptions.map((hour) => (
                                    <MenuItem key={`hour-${hour}`} value={hour}>
                                        {hour} hour{hour > 1 ? 's' : ''}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                value={minutes}
                                onChange={handleMinuteChange}
                                fullWidth
                                variant="outlined"
                            >
                                {minuteOptions.map((minute) => (
                                    <MenuItem key={`minute-${minute}`} value={minute}>
                                        {minute} minute{minute > 1 ? 's' : ''}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#8c8c8c', mb: 1 }}>Total:</Typography>
                        <Typography variant="h5" sx={{ color: '#d4a60d', fontWeight: 'bold' }}>{calculateTotalPrice()}$</Typography>
                    </Box>

                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#8c7b4f',
                                color: '#fff',
                                width: '100%',
                                py: 1.5,
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#6d5c3b' },
                            }}
                            onClick={handleBooking}
                            disabled={!selectedParking || timeLeft}
                        >
                            Reserve
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={dialog.open} onClose={handleCloseDialog}>
                <DialogTitle>Booking Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialog.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BookingPage;