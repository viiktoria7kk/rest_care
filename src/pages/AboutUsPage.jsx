import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutUsPage = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 8, color: '#f4c430', paddingBottom: '200px' }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#f4c430' }}>
                    Про Rest Care
                </Typography>
                <Typography variant="h6" sx={{ color: '#d4a60d' }}>
                    Зона комфорту для вас і вашого автомобіля в самому серці міста Ужгород
                </Typography>
            </Box>
            <Box mb={4}>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#f4c430' }}>
                    Rest Care — це не просто паркінг, це інноваційний багатофункціональний простір, який поєднує підземну парковку з зонами відпочинку.
                </Typography>
            </Box>
            <Box textAlign="center">
                <Typography variant="h6" sx={{ color: '#d4a60d' }}>
                    Приєднуйтесь до нас у Rest Care — місці, де комфорт і функціональність поєднуються!
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutUsPage;