import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: "USER_LOGOUT"});
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: "USER_LOGIN_REQUEST"});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API_URL}/api/v1/auth/jwt/create`, {email, password}, config)

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        
        // Return success result
        return { success: true, data };
    } catch(error) {
        const errorPayload = error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message;
            
        dispatch({
            type: "USER_LOGIN_FAIL",
            payload: errorPayload,
        });
      
        if (error.response?.data?.detail === "Given token not valid for any token type") {
            dispatch(logout());
        }
        
        // Return error result
        return { success: false, error: errorPayload };
    }
}

export const register = (username, firstName, lastName, email, password, re_password) => async(dispatch) => {
    try{
        dispatch({type: "USER_REGISTER_REQUEST"});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API_URL}/api/v1/auth/users/`, {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            re_password
        }, config)

        dispatch({
            type: "USER_REGISTER_SUCCESS",
            payload:data
        })
    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
          });
    }   
}