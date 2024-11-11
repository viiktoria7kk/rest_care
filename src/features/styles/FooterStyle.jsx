import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    footer: {
        backgroundColor: '#34495e',
        color: '#ecf0f1',
        padding: '20px 10px',
        marginTop: 'auto',
    },
    logo: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#f4c430',
    },
    section: {
        marginBottom: '15px',
    },
    title: {
        fontSize: '1.25rem',
        marginBottom: '8px',
    },
    link: {
        color: '#ecf0f1',
        textDecoration: 'none',
        '&:hover': {
            color: '#f4c430',
        },
    },
    socialIcons: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    icon: {
        color: '#ecf0f1',
        fontSize: '1.25rem',
        transition: 'color 0.3s',
        '&:hover': {
            color: '#f4c430',
        },
    },
}));

export default useStyles;