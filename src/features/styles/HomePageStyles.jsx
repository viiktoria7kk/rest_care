import { makeStyles } from '@mui/styles';

const useHomePageStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '190px 20px',
        textAlign: 'center',
        backgroundColor: '#121212',
    },
    title: {
        fontSize: '2.8rem',
        fontWeight: '600',
        color: '#f4c430',
        marginBottom: '25px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
    },
    subtitle: {
        fontSize: '1.3rem',
        color: '#d4a60d',
        marginBottom: '15px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    description: {
        maxWidth: '650px',
        color: '#f4c430',
        lineHeight: '1.75',
        margin: '0 auto 40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    primaryButton: {
        backgroundColor: '#f4c430',
        color: '#121212',
        padding: '14px 40px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
        '&:hover': {
            backgroundColor: '#d4a60d',
            color: '#fff',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
        },
    },
    secondaryButton: {
        color: '#f4c430',
        border: '2px solid #f4c430',
        padding: '14px 40px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: '#d4a60d',
            color: '#fff',
        },
    },
}));

export default useHomePageStyles;
