import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import useStyles from '../styles/FooterStyle.jsx';

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer} style={{ backgroundColor: '#121212', color: '#f4c430', padding: '40px 0' }}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3} className={classes.section}>
                        <Typography variant="h6" className={classes.logo} style={{ fontWeight: 'bold' }}>
                            Rest Care
                        </Typography>
                        <Typography variant="body2">
                            Ваш простір для паркування та відпочинку в центрі міста.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className={classes.section}>
                        <Typography className={classes.title} style={{ color: '#f4c430' }}>Швидкі посилання</Typography>
                        <Link href="/about" className={classes.link} style={{ color: '#f4c430' }}>Про нас</Link><br />
                        <Link href="/services" className={classes.link} style={{ color: '#f4c430' }}>Послуги</Link><br />
                        <Link href="/faq" className={classes.link} style={{ color: '#f4c430' }}>FAQ</Link><br />
                        <Link href="/contact" className={classes.link} style={{ color: '#f4c430' }}>Контакти</Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className={classes.section}>
                        <Typography className={classes.title} style={{ color: '#f4c430' }}>Зв&#39;яжіться з нами</Typography>
                        <Typography variant="body2" style={{ color: '#f4c430' }}>Email: support@restcare.com</Typography>
                        <Typography variant="body2" style={{ color: '#f4c430' }}>Телефон: +1 (555) 123-4567</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className={classes.section}>
                        <Typography className={classes.title} style={{ color: '#f4c430' }}>Соцмережі</Typography>
                        <div className={classes.socialIcons}>
                            <Link href="#" className={classes.icon} style={{ color: '#f4c430', marginRight: '10px' }}>Facebook</Link>
                            <Link href="#" className={classes.icon} style={{ color: '#f4c430', marginRight: '10px' }}>Twitter</Link>
                            <Link href="#" className={classes.icon} style={{ color: '#f4c430', marginRight: '10px' }}>Instagram</Link>
                            <Link href="#" className={classes.icon} style={{ color: '#f4c430' }}>LinkedIn</Link>
                        </div>
                    </Grid>
                </Grid>
                <Typography variant="body2" style={{ textAlign: 'center', marginTop: '20px', color: '#f4c430' }}>
                    © {new Date().getFullYear()} Rest Care. Всі права захищені.
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;