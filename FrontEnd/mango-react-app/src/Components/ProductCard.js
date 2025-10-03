import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ productId, name, price, description, categoryName, imageUrl }) => {
    return (
        <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm border rounded">
                <img
                    src={imageUrl || 'https://placehold.co/600x400?text=No+Image'}
                    className="card-img-top"
                    alt={name}
                    style={{ height: '200px', objectFit: 'contain' }}
                />

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="text-danger fw-bold">₹{price.toFixed(2)}</p>
                    <span className="badge bg-warning text-dark mb-2">{categoryName}</span>
                    <p className="card-text">{description}</p>


                    <Link to={`/products/${productId}`} className="btn btn-success form-control">
                        Details
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;
