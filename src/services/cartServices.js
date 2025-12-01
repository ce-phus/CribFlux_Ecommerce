import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCartAPI = (config) => {
  return axios.get(`${API_URL}/api/v2/cart/shop-cart/`, config);
};

export const addToCartAPI = (productId, quantity = 1, config) => {
  return axios.post(`${API_URL}/api/v2/cart/shop-cart/`, {
    product_id: productId,
    quantity,
  }, config);
};

export const removeFromCartAPI = (productId, config) => {
  return axios.delete(`${API_URL}/api/v2/cart/shop-cart/`, {
    ...config,
    data: { product_id: productId },
  });
};

