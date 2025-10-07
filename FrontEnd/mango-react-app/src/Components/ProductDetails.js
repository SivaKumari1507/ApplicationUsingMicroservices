/* import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5016/api/product/${productId}`) // No auth header needed for public access
      .then(response => setProduct(response.data.result))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to your cart.');
      navigate('/login');
      return;
    }

    const cartItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl
    };

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(cartItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));

    toast.success(`${quantity} pair(s) of "${product.name}" added to cart!`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary">{product.name}</h2>
      <img
        src={product.imageUrl || 'https://placehold.co/600x400?text=No+Image'}
        alt={product.name}
        style={{ height: '300px', objectFit: 'contain' }}
        className="mb-3"
      />
      <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
      <p><strong>Category:</strong> {product.categoryName}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity:</label>
        <input
          type="number"
          id="quantity"
          className="form-control"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>

      <button className="btn btn-success" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsPage; */

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetails = ({ show, onHide, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.info('Please login to add items to your cart.');
      navigate('/login');
      return;
    }

    const cartItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl
    };

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(cartItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));

    toast.success(`${quantity} pair(s) of "${product.name}" added to cart!`);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.imageUrl || 'https://placehold.co/600x600?text=No+Image'}
          alt={product.name}
          className="img-fluid mb-3"
          style={{ objectFit: 'contain', maxHeight: '300px',width:'100%' }}
        />
        <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> {product.categoryName}</p>
        <p><strong>Description:</strong> {product.description}</p>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;