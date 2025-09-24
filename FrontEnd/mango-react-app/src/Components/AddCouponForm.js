import React, { useState } from 'react';
import { addCoupon } from '../api/couponApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddCouponForm() {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!couponCode.trim()) newErrors.couponCode = 'Coupon code is required.';
    if (!discountAmount || parseFloat(discountAmount) <= 0)
      newErrors.discountAmount = 'Discount must be greater than 0.';
    if (!minAmount || parseInt(minAmount) <= 0)
      newErrors.minAmount = 'Minimum amount must be greater than 0.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newCoupon = {
      couponCode,
      discountAmount: parseFloat(discountAmount),
      minAmount: parseInt(minAmount)
    };

    addCoupon(newCoupon)
      .then(() => {
        toast.success('Coupon added successfully!');
        setCouponCode('');
        setDiscountAmount('');
        setMinAmount('');
        setErrors({});
        navigate('/coupons');
      })
      .catch(err => {
        console.error('Error adding coupon:', err);
        toast.error('Failed to add coupon.');
      });
  };

  const handleCancel = () => {
    navigate('/coupons');
  };

  return (
    <div className="container mt-0">
      <h2 className="mb-4 text-center">Create Coupon</h2>
      <form onSubmit={handleSubmit} className="border p-5 rounded shadow bg-light" style={{ maxWidth: '600px', margin: '1 auto' }}>
        <div className="mb-3">
          <label className="form-label">Coupon Code</label>
          <input
            type="text"
            className={`form-control ${errors.couponCode ? 'is-invalid' : ''}`}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {errors.couponCode && <div className="invalid-feedback">{errors.couponCode}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Discount Amount</label>
          <input
            type="number"
            className={`form-control ${errors.discountAmount ? 'is-invalid' : ''}`}
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
          />
          {errors.discountAmount && <div className="invalid-feedback">{errors.discountAmount}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Minimum Amount</label>
          <input
            type="number"
            className={`form-control ${errors.minAmount ? 'is-invalid' : ''}`}
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          {errors.minAmount && <div className="invalid-feedback">{errors.minAmount}</div>}
        </div>

        <div className="d-flex justify-content-between">
          <button type="button"  className="btn btn-outline-primary ms-1" onClick={handleCancel}>Cancel
          </button>
          <button type="submit" className="btn btn-outline-success ms-1" > Add Coupon
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddCouponForm;