import React, {useState} from 'react';
import axios from 'axios';
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
import {useFormik} from 'formik';
import * as yup from 'yup';
import {styled} from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';
import {Link} from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const validationSchema = yup.object({
    email: yup.string().email('Введіть дійсну електронну адресу').required("Електронна адреса є обов'язковою"),
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

const a;

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
    marginTop: '16px',
    fontSize: '16px',
    padding: '12px 24px',
    textTransform: 'none',
    borderColor: '#f4c430',
    color: '#f4c430',
    fontWeight: '500',
    width: '100%',
    maxWidth: 400,
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: '#f4c430',
        color: '#121212',
    },
});

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState({open: false, message: ''});

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting, setFieldError}) => {
            setLoading(true);
            try {
                const response = await axios.post(`${API_URL}/auth/send-auth-email`, values);
                const message = response.data;

                if (message.includes('Sign-up link')) {
                    setDialog({
                        open: true,
                        message: 'Ми надіслали вам посилання для підтвердження на електронну адресу. Будь ласка, перейдіть за ним для завершення реєстрації.',
                    });
                } else if (message.includes('Sign-in link')) {
                    setDialog({
                        open: true,
                        message: 'Схоже, у вас вже є обліковий запис. Ми надіслали вам посилання для входу на електронну адресу.',
                    });
                } else {
                    setDialog({open: true, message});
                }
            } catch {
                setFieldError('email', 'Не вдалося зареєструватися');
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    const handleGoogleSignUp = () => {
        window.location.href = `${API_URL}/auth/google/login`;
    };

    const handleCloseDialog = () => {
        setDialog({open: false, message: ''});
    };

    return (
        <StyledContainer>
            <StyledPaper>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                    Реєстрація
                </Typography>
                <Typography variant="body1" color="white" gutterBottom>
                    Заповніть дані для створення облікового запису.
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        label="Електронна адреса"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{backgroundColor: '#fff', borderRadius: '8px'}}
                    />
                    {loading ? (
                        <Box display="flex" justifyContent="center" my={2}>
                            <CircularProgress/>
                        </Box>
                    ) : (
                        <StyledButton type="submit" variant="contained" fullWidth disabled={formik.isSubmitting}>
                            Зареєструватися
                        </StyledButton>
                    )}
                    <GoogleButton onClick={handleGoogleSignUp} variant="outlined" startIcon={<GoogleIcon/>}>
                        Зареєструватися через Google
                    </GoogleButton>
                    <Typography variant="body2" align="center" sx={{mt: 2}}>
                        Вже маєте обліковий запис?{' '}
                        <Link to="/login" style={{textDecoration: 'none', color: '#f4c430', fontWeight: '500'}}>
                            Увійти!
                        </Link>
                    </Typography>
                </Box>

                <Dialog open={dialog.open} onClose={handleCloseDialog}>
                    <DialogTitle>Повідомлення</DialogTitle>
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

export default SignUp;