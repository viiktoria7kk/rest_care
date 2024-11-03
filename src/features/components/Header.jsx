import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useHeaderStyles from '../styles/HeaderStyles.jsx';
import LogoutButton from './LogoutButton.jsx';
import PropTypes from 'prop-types';

const Header = ({ isAuthenticated, onLogout }) => {
    const classes = useHeaderStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={classes.appBar} style={{ backgroundColor: '#121212', color: '#f4c430' }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title} style={{ fontWeight: 'bold' }}>
                    Rest Care
                </Typography>
                <div className={classes.desktopMenu}>
                    <Button component={Link} to="/" className={classes.button} style={{ color: '#f4c430' }}>Головна</Button>
                    <Button component={Link} to="/booking" className={classes.button} style={{ color: '#f4c430' }}>Бронювання</Button>
                    <Button component={Link} to="/about" className={classes.button} style={{ color: '#f4c430' }}>Про нас</Button>
                    {isAuthenticated ? (
                        <LogoutButton onLogout={onLogout} />
                    ) : (
                        <>
                            <Button component={Link} to="/signup" className={classes.button} style={{ color: '#f4c430' }}>Реєстрація</Button>
                            <Button component={Link} to="/login" className={classes.button} style={{ color: '#f4c430' }}>Увійти</Button>
                        </>
                    )}
                    {isAuthenticated && (
                        <Button component={Link} to="/profile" className={classes.button} style={{ color: '#f4c430' }}>
                            <AccountCircle />
                        </Button>
                    )}
                </div>
                <div className={classes.mobileMenu}>
                    <Typography variant="h6" className={classes.mobileTitle} style={{ fontWeight: 'bold' }}>
                        Rest Care
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} className={classes.mobileMenuIcon}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem component={Link} to="/" onClick={handleMenuClose}>Головна</MenuItem>
                        <MenuItem component={Link} to="/booking" onClick={handleMenuClose}>Бронювання</MenuItem>
                        <MenuItem component={Link} to="/about" onClick={handleMenuClose}>Про нас</MenuItem>
                        {isAuthenticated ? (
                            <MenuItem onClick={() => { handleMenuClose(); onLogout(); }}>Вийти</MenuItem>
                        ) : (
                            <>
                                <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>Реєстрація</MenuItem>
                                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Увійти</MenuItem>
                            </>
                        )}
                        {isAuthenticated && (
                            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                                <AccountCircle />
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Header;