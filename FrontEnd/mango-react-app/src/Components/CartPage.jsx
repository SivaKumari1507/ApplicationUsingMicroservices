
import React, { useEffect, useState } from 'react';
import {
  getCart,
  applyCoupon,
  removeCartItem,
  updateCartItem,
} from '../services/cartService';
import CartItem from './CartItem';
import { useAuth } from '../Context/AuthContext';

const CartPage = ({ setCartCount }) => {
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const userId = user?.userId || user?.id || user?.email;

  const fetchCart = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await getCart(userId);
      setCart(response.data.result);
      setCartCount(response.data.result.cartDetails.length);
      setCouponCode(response.data.result.cartHeader.couponCode || '');
      setMessage('');
    } catch (err) {
      setMessage('Failed to load cart.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleApplyCoupon = async () => {
    setLoading(true);
    try {
      await applyCoupon({ cartHeader: { userId, couponCode } });
      await fetchCart();
      setMessage('Coupon applied successfully!');
    } catch {
      setMessage('Invalid coupon or failed to apply.');
    }
    setLoading(false);
  };

  const handleRemoveCoupon = async () => {
    setLoading(true);
    try {
      await applyCoupon({ cartHeader: { userId, couponCode: '' } });
      setCouponCode('');
      await fetchCart();
      setMessage('Coupon removed.');
    } catch {
      setMessage('Failed to remove coupon.');
    }
    setLoading(false);
  };

  const handleRemove = async (id) => {
    await removeCartItem(id);
    await fetchCart();
  };

  const handleUpdate = async (item) => {
    const cartDto = {
      cartHeader: { userId },
      cartDetails: [item],
    };
    await updateCartItem(cartDto);
    await fetchCart();
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );

  if (!cart || cart.cartDetails.length === 0)
    return <h1 className="text-center mt-5">Your cart is empty.</h1>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row g-4">
        {cart.cartDetails.map((item) => (
          <div className="col-md-6 col-lg-4" key={item.cartDetailsId}>
            <CartItem item={item} onRemove={handleRemove} onUpdate={handleUpdate} />
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 bg-light rounded shadow-sm">
        <h4>Order Summary</h4>
        <p>Subtotal: ₹{cart.cartHeader.cartTotal + cart.cartHeader.discount}</p>
        <p>Discount: ₹{cart.cartHeader.discount}</p>
        <p>
          <strong>Order Total: ₹{cart.cartHeader.cartTotal}</strong>
        </p>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={!!cart.cartHeader.couponCode}
          />
          {cart.cartHeader.couponCode ? (
            <button className="btn btn-danger" onClick={handleRemoveCoupon}>
              Remove Coupon
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleApplyCoupon}>
              Apply Coupon
            </button>
          )}
        </div>

        {message && <p className="mt-2 text-info">{message}</p>}
      </div>
    </div>
  );
};

export default CartPage;