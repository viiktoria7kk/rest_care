import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import useHomePageStyles from '../features/styles/HomePageStyles.jsx';

const HomePage = () => {
    const classes = useHomePageStyles();

    return (
        <div className="background-blur">
            <Container maxWidth="lg" className={`${classes.container} fade-in`}>
                <Typography variant="h2" className={`${classes.title} gold-text`} gutterBottom>
                    Rest Care – Комфортний простір для паркування та відпочинку
                </Typography>
                <Typography variant="h6" className={`${classes.subtitle} gold-text`} gutterBottom>
                    Зручне бронювання паркомісця та місця для відпочинку в центрі міста Ужгород.
                </Typography>
                <Typography variant="body1" className={`${classes.description} gold-text`} paragraph>
                    Забронюйте паркомісце через мобільний додаток або онлайн, обирайте серед варіантів із зарядкою для електромобілів, та насолоджуйтесь атмосферою на терасі або у нашому коворкінгу.
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Button variant="contained" className={`${classes.primaryButton} fade-in`} component={Link} to="/booking">
                            Забронювати місце
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={`${classes.secondaryButton} fade-in`} component={Link} to="/about">
                            Дізнатись більше
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default HomePage;
