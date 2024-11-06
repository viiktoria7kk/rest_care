import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from './features/components/Header.jsx';
import Footer from './features/components/Footer.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import useAuth from './features/hooks/useAuth.jsx';
import AppRoutes from './routes/index.jsx';
import useTokenFromUrl from './features/hooks/useTokenFromUrl.jsx';
import useRefreshTokenInterval from './features/hooks/useRefreshTokenInterval.jsx';
import theme from "./features/themes/theme.jsx";

const App = () => {
    const { isAuthenticated, handleLogout, setIsAuthenticated } = useAuth();

    useRefreshTokenInterval(handleLogout);
    useTokenFromUrl();

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <ThemeProvider theme={theme}>
            <GoogleOAuthProvider clientId={googleClientId}>
                <Router>
                    <div className="App">
                        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                        <div className="content">
                            <AppRoutes setIsAuthenticated={setIsAuthenticated} />
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
};

export default App;