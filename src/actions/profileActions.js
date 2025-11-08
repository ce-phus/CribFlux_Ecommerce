import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

import { logout } from './userActions';

export const refreshToken = () => async (dispatch, getState) => {
    try {
        const { userLoginReducer: { userInfo } } = getState();
        
        if (!userInfo?.refresh) {
            throw new Error('No refresh token available');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            `${API_URL}/api/v1/auth/jwt/refresh/`,
            { refresh: userInfo.refresh },
            config
        );

        // Update userInfo with new access token
        const updatedUserInfo = {
            ...userInfo,
            access: data.access,
        };

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: updatedUserInfo,
        });

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        
        return data.access;
    } catch (error) {
        dispatch(logout());
        throw error;
    }
}

export const getProfile = () => async (dispatch, getState) => {
    try {
        dispatch({type: 'PROFILE_REQUEST'});

        let { userLoginReducer: { userInfo } } = getState();
        
        if (!userInfo?.access) {
            console.log('No access token found');
            dispatch({
                type: 'PROFILE_FAIL',
                payload: 'No authentication token found',
            });
            return;
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        console.log('Fetching profile with token:', userInfo.access.substring(0, 20) + '...');

        try {
            const { data } = await axios.get(`${API_URL}/api/v2/profiles/me/`, config);
            dispatch({ type: 'PROFILE_SUCCESS', payload: data });
        } catch (error) {
            console.log('Profile fetch error, status:', error.response?.status);
            
            if (error.response?.status === 401) {
                // Token might be expired, try to refresh
                console.log('Token expired, attempting refresh...');
                try {
                    const newAccessToken = await dispatch(refreshToken());
                    
                    // Update config with new token
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                    
                    // Retry the request
                    const { data } = await axios.get(`${API_URL}/api/v2/profiles/me/`, config);
                    dispatch({ type: 'PROFILE_SUCCESS', payload: data });
                } catch (refreshError) {
                    console.log('Token refresh failed:', refreshError);
                    dispatch(logout());
                    throw refreshError;
                }
            } else if (error.response?.status === 403) {
                console.log('Access forbidden, logging out...');
                dispatch(logout());
                throw new Error('Access forbidden');
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Profile fetch error:', error);
        
        dispatch({
            type: 'PROFILE_FAIL',
            payload: error.response?.data || error.message,
        });
    }
}