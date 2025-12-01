
  import { 
    fetchCartAPI,
    addToCartAPI,
    removeFromCartAPI
} from "../services/cartServices";
  
  // ---- Fetch Cart ----
  export const fetchCart = () => async (dispatch, getState) => {
    try {
      dispatch({ type: "CART_FETCH_REQUEST" });

      const {
          userLoginReducer: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo?.access}`,
          },
      };
  
      const { data } = await fetchCartAPI(config);
  
      dispatch({
        type: "CART_FETCH_SUCCESS",
        payload: data.items, // backend returns { items, total_cost, total_quantity }
      });
    } catch (error) {
      dispatch({
        type: "CART_FETCH_FAIL",
        payload: error.response?.data || error.message,
      });
    }
  };
  
  // ---- Add to Cart ----
  export const addToCart = (productId, quantity = 1) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "CART_ADD_ITEM_REQUEST",
        payload: { productId, quantity },
      });

      const {
        userLoginReducer: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo?.access}`,
          },
      };
  
      const { data } = await addToCartAPI(productId, quantity, config);
  
      dispatch({
        type: "CART_ADD_ITEM_SUCCESS",
        payload: data.items, // backend returns updated items list
      });
    } catch (error) {
      dispatch({
        type: "CART_ADD_ITEM_FAIL",
        payload: error.response?.data || error.message,
      });
    }
  };
  
  // ---- Remove from Cart ----
  export const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CART_REMOVE_ITEM_REQUEST" });

      const {
        userLoginReducer: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo?.access}`,
          },
      };
  
      const { data } = await removeFromCartAPI(productId, config);
  
      dispatch({
        type: "CART_REMOVE_ITEM_SUCCESS",
        payload: data.items,
      });
    } catch (error) {
      dispatch({
        type: "CART_REMOVE_ITEM_FAIL",
        payload: error.response?.data || error.message,
      });
    }
  };
  