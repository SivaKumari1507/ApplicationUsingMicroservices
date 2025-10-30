import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Order Success';
    }, []);

    return (
        <div className="success-page">
            <div className="success-animation">
                <div className="circle">
                    <div className="checkmark">✓</div>
                </div>
            </div>
            <h2 className="text-success">Order Placed Successfully! 🎉</h2>
            <p className="lead">Thank you for your purchase. Your order has been placed and is being processed.</p>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderSuccess;