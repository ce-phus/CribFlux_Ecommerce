const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CART_FETCH_REQUEST":
      case "CART_ADD_ITEM_REQUEST":
      case "CART_REMOVE_ITEM_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case "CART_FETCH_SUCCESS":
      case "CART_ADD_ITEM_SUCCESS":
      case "CART_REMOVE_ITEM_SUCCESS":
        return {
          ...state,
          loading: false,
          cartItems: action.payload || [],
        };
  
      case "CART_FETCH_FAIL":
      case "CART_ADD_ITEM_FAIL":
      case "CART_REMOVE_ITEM_FAIL":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  