import { useEffect } from 'react';
import { refreshToken } from '../utils/auth.jsx';

const useRefreshTokenInterval = (handleLogout) => {
    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken(handleLogout);
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, [handleLogout]);
};

export default useRefreshTokenInterval;