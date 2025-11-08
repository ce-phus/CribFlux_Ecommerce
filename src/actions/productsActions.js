import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || ""

export const getFeaturedProducts = ()=> async (dispatch) => {
    try{
        dispatch({type: 'FEATURED_PRODUCTS_REQUEST'});

        const {data} = await axios.get(
            `${API_URL}/api/v2/core/index/`
        );

        dispatch({
            type: 'FEATURED_PRODUCTS_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'FEATURED_PRODUCTS_FAIL',
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const allProducts = (pageNumber = '', keyword = '') => async (dispatch) => {
    
}