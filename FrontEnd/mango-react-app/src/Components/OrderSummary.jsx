import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { placeOrder } from '../services/orderService';

const OrderSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.token;
  const cart = state?.cart;

  const [name, setName] = useState(() => cart?.cartHeader?.name || '');
  const [email, setEmail] = useState(() => cart?.cartHeader?.email || '');
  const [phone, setPhone] = useState(() => cart?.cartHeader?.phone || '');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [errors, setErrors] = useState({});

  if (!cart) return <h2 className="text-center mt-5">No order data found.</h2>;

  const { cartHeader, cartDetails } = cart;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const handlePlaceOrder = async () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';
    else if (!/^[A-Za-z ]+$/.test(name)) newErrors.name = 'Name should contain letters only.';

    if (!email.trim() || !/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(email)) newErrors.email = 'Enter a valid email.';
    if (!phone.trim() || !/^\d{10}$/.test(phone)) newErrors.phone = 'Enter a valid 10-digit phone number.';
    if (!address.trim()) newErrors.address = 'Address is required.';
    if (!pincode.trim() || !/^\d{6}$/.test(pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const updatedCart = {
      ...cart,
      cartHeader: {
        ...cartHeader,
        name,
        email,
        phone,
        address,
        pincode,
        paymentMethod,
      },
    };

    try {
      const response = await placeOrder(updatedCart, token);

      if (response.isSuccess) {

        // alert('Order placed successfully!');
        navigate('/order-success', { state: { order: response.result } });
      } else {
        alert('Order failed: ' + response.message);
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-primary mb-4">Order Summary</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="mb-4">
            <h4 className="text-secondary">Delivery Details</h4>
            <input type="text" className="form-control mb-1" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <small className="text-danger">{errors.name}</small>}

            <input type="email" className="form-control mb-1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <small className="text-danger">{errors.email}</small>}

            <input type="text" className="form-control mb-1" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}

            <textarea className="form-control mb-1" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            {errors.address && <small className="text-danger">{errors.address}</small>}

            <input type="text" className="form-control mb-1" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
          </div>

          <div className="mb-4">
            <h4 className="text-secondary">Products</h4>
            {cartDetails?.map((item) => (
              <div key={item.cartDetailsId} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.product?.imageUrl || 'https://placehold.co/600x600?text=No+Image'}
                      alt={item.product?.name || 'Product image'}
                      className="img-fluid rounded-start"
                      style={{ height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-dark">{item.product?.name}</h5>
                      <p className="card-text text-muted">Price: ₹{item.product?.price}</p>
                      <p className="card-text text-muted">Quantity: {item.count}</p>
                      <p className="card-text text-success">
                        <strong>Total: ₹{(item.product?.price || 0) * (item.count || 0)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )) ?? <p>No products in the cart.</p>}
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded bg-light border shadow-sm">
            <h5 className="text-dark mb-3">Price Details</h5>
            <p className="text-muted">Subtotal: ₹{(cartHeader?.cartTotal || 0) + (cartHeader?.discount || 0)}</p>
            <p className="text-muted">Discount: ₹{cartHeader?.discount || 0}</p>
            <hr />
            <p className="text-dark"><strong>Order Total: ₹{cartHeader?.cartTotal || 0}</strong></p>
            <p className="text-muted">Estimated Delivery: {estimatedDelivery.toDateString()}</p>

            <h6 className="mt-4">Payment Method</h6>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label">UPI</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="paymentMethod" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label">Credit/Debit Card</label>
            </div>

            <button className="btn btn-success mt-4 w-100" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
