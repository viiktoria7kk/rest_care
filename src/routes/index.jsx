import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const BookingPage = lazy(() => import('../pages/BookingPage.jsx'));
const AboutUsPage = lazy(() => import('../pages/AboutUsPage.jsx'));
const SignUp = lazy(() => import('../pages/SignUpPageGeneral.jsx'));
const Login = lazy(() => import('../pages/LoginGeneralPage.jsx'));
const ConfirmEmail = lazy(() => import('../features/components/ConfirmEmail.jsx'));
const ConfirmSignInEmail = lazy(() => import('../pages/ConfirmSignInEmail.jsx'));
const Profile = lazy(() => import('../pages/Profile.jsx'));

const AppRoutes = ({ setIsAuthenticated }) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/confirm-email" element={<ConfirmEmail setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/confirm-email-sign-in" element={<ConfirmSignInEmail setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </Suspense>
);

AppRoutes.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default AppRoutes;