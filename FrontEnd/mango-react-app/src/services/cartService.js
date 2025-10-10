import axios from 'axios';

const baseUrl = 'http://localhost:5017';

export const getCart = async (userId) => {
  return await axios.get(`${baseUrl}/api/cart/GetCart/${userId}`);
};

export const applyCoupon = async (cartDto) => {
  return await axios.post(`${baseUrl}/api/cart/ApplyCoupon`, cartDto);
};

export const removeCartItem = async (cartDetailsId) => {
  return await axios.post(`${baseUrl}/api/cart/RemoveCart`, cartDetailsId, {
    headers: { 'Content-Type': 'application/json' },
  });
};
 
export const updateCartItem = async (cartDto) => {
  return await axios.post('http://localhost:5017/api/cart/CartUpsert', cartDto);
};