import axios from 'axios';

export const placeOrder = async (cart, token) => {
  const response = await axios.post(
    'http://localhost:5018/api/order/CreateOrder',
    cart,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
