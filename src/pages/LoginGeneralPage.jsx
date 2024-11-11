import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const validationSchema = yup.object({
  email: yup.string().email('Введіть дійсну адресу електронної пошти').required("Електронна пошта обов'язкова"),
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '16px',
  backgroundColor: '#121212',
});

const StyledPaper = styled(Paper)({
  padding: '32px',
  maxWidth: 400,
  width: '100%',
  borderRadius: '8px',
  textAlign: 'center',
  backgroundColor: '#1e1e1e',
  color: '#f4c430',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
  padding: '12px',
  textTransform: 'none',
  fontSize: '16px',
  backgroundColor: '#f4c430',
  color: '#121212',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#d4a60d',
  },
});

const GoogleButton = styled(Button)({
  fontSize: '16px',
  padding: '12px 24px',
  textTransform: 'none',
  borderColor: '#f4c430',
  color: '#f4c430',
  fontWeight: '500',
  width: '100%',
  marginTop: '16px',
  maxWidth: 400,
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: '#f4c430',
    color: '#121212',
  },
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({ open: false, message: '' });

  const handleGoogleLogin = async () => {
    window.location.href = `${API_URL}/auth/google/login`;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/auth/send-auth-email`, values);
        const message = response.data;

        setDialog({
          open: true,
          message: message.includes('Sign-up link')
              ? 'Схоже, що у вас ще немає облікового запису. Ми надіслали на вашу пошту посилання для реєстрації. Перейдіть за ним для завершення реєстрації та входу.'
              : message,
        });
      } catch {
        setFieldError('email', 'Не вдалося зареєструватися');
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleCloseDialog = () => {
    setDialog({ open: false, message: '' });
  };

  return (
      <StyledContainer>
        <StyledPaper>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Вхід
          </Typography>
          <Typography variant="body1" color="white" gutterBottom>
            Будь ласка, заповніть дані для входу до облікового запису.
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
                label="Електронна пошта"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
            />
            {loading ? (
                <Box display="flex" justifyContent="center" my={2}>
                  <CircularProgress />
                </Box>
            ) : (
                <StyledButton type="submit" variant="contained" fullWidth disabled={formik.isSubmitting}>
                  Увійти
                </StyledButton>
            )}
            <GoogleButton onClick={handleGoogleLogin} variant="outlined" startIcon={<GoogleIcon />}>
              Увійти через Google
            </GoogleButton>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Немає облікового запису?{' '}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#f4c430', fontWeight: '500' }}>
                Зареєструйтесь!
              </Link>
            </Typography>
          </Box>

          <Dialog open={dialog.open} onClose={handleCloseDialog}>
            <DialogTitle>Лист надіслано</DialogTitle>
            <DialogContent>
              <DialogContentText>{dialog.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Ок
              </Button>
            </DialogActions>
          </Dialog>
        </StyledPaper>
      </StyledContainer>
  );
};

export default Login;