import { makeStyles } from '@mui/styles';

const useHeaderStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#000000',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px 0',
        borderBottom: '1px solid #e0e0e0',
        [theme.breakpoints.down('sm')]: {
            padding: '5px 0',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
        },
    },
    title: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: '1.5rem',
        color: '#f4c430',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    button: {
        color: '#f4c430',
        fontWeight: '600',
        marginLeft: '8px',
        '&:hover': {
            backgroundColor: '#e5f1ff',
            color: '#f4c430',
            borderRadius: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0',
            marginBottom: '5px',
        },
    },
    desktopMenu: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    mobileMenu: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        },
    },
    mobileMenuIcon: {
        marginLeft: 'auto',
    },
    mobileTitle: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: '1rem',
        color: '#f4c430',
        display: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    }
}));

export default useHeaderStyles;