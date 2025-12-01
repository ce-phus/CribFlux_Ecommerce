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

export const allproducts = (page = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`${API_URL}/api/v2/core/allproducts/?page=${page}`);

        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: ALL_PRODUCTS_FAIL, payload: error.message });
    }
};

export const getCategoryDetail = (slug) => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_DETAIL_REQUEST" });

        const { data } = await axios.get(`${API_URL}/api/v2/store/category/${slug}/`);

        dispatch({ type: "CATEGORY_DETAIL_SUCCESS", payload: data });

    } catch (error) {
        dispatch({ 
            type: "CATEGORY_DETAIL_FAIL", 
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message 
    });
    }
};

export const getProductDetail = (category_slug, slug) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DETAIL_REQUEST" });

        const { data } = await axios.get(`${API_URL}/api/v2/store/${category_slug}/${slug}/`);

        dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data });
        // console.log("Product detail action: ", data)

    } catch (error) {
        dispatch({
             type: "PRODUCT_DETAIL_FAIL", 
             payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message  
        });
    }
};

export const getProductsDetailed = (slug) => async(dispatch) => {
    try{
        dispatch({type: "PRODUCTS_DETAILED_REQUEST"});

        const {data} = await axios.get(`${API_URL}/api/v2/store/${slug}/`);
        dispatch({type: "PRODUCTS_DETAILED_SUCCESS", payload: data});
    } catch (error){
        dispatch({
            type: "PRODUCTS_DETAILED_FAIL",
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const submitProductReview = (category_slug, slug, reviewData) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_REVIEW_REQUEST" });

        const { data } = await axios.post(`${API_URL}/api/v2/store/${category_slug}/${slug}/`, reviewData);

        dispatch({ type: "PRODUCT_REVIEW_SUCCESS", payload: data });

    } catch (error) {
        dispatch({
             type: "PRODUCT_REVIEW_FAIL", 
             payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message  
        });
    }
};

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LIST_REQUEST" });

        const { data } = await axios.get(`${API_URL}/api/v2/store/categories/`);
       

        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
};