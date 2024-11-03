import axios from 'axios';

export const refreshToken = async () => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    if (accessTokenFromLocalStorage) {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh-token`, {}, {
            headers: {
                Authorization: `Bearer ${accessTokenFromLocalStorage}`
            }
        });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    }
};