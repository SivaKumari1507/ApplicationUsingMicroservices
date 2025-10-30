import React, {  useEffect, useState } from 'react';
import { getCoupons, deleteCoupon } from '../api/couponApi';
import { useNavigate } from 'react-router-dom';
import './CouponList.css';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();
  const {user}=useAuth();

  useEffect(() => {
    getCoupons()
      .then(res => setCoupons(res.data.result))
      .catch(err => console.error('Error fetching coupons:', err));
  }, []);

  const handleDelete = (id) => {
    if(user?.role!=='ADMIN'){
           toast.error('Only Admin can create coupons');
           return;
         }
  if (window.confirm('Are you sure you want to delete this coupon?')) {
    deleteCoupon(id)
      .then(() => {
        setCoupons(coupons.filter(c => c.couponId !== id));
        toast.success('Coupon deleted successfully!');
      })
      .catch(err => {
        console.error('Error deleting coupon:', err);
        toast.error('Failed to delete coupon.');
      });
  }
};


 const goToCreatePage = () => {
  if(user?.role!=='ADMIN'){
    toast.error('Only Admin can create coupons');
    return;
  }
  navigate('/add-coupon'); 
};


  return (
    <div className="coupon-table-container">
      <div className="header-row">
        <h2>Coupon List</h2>
        <button className="create-btn" onClick={goToCreatePage}>Create Coupon</button>
      </div>

      <table className="coupon-table">
        <thead>
          <tr>
            <th>Coupon Code</th>
            <th>Discount Amount</th>
            <th>Minimum Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(coupon => (
            <tr key={coupon.couponId}>
              <td>{coupon.couponCode}</td>
              <td>₹{coupon.discountAmount.toFixed(2)}</td>
              <td>₹{coupon.minAmount.toFixed(2)}</td>
              <td>
                <button className="btn btn-outline-danger btn-sm mb-7" onClick={() => handleDelete(coupon.couponId)}><i class="bi bi-trash-fill"></i>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CouponList;
