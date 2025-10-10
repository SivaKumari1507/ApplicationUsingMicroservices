import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCartItem } from '../services/cartService'; 

const ProductDetails = ({ show, onHide, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      toast.info('Please login to add items to your cart.');
      navigate('/login');
      return;
    }

    const cartDto = {
      cartHeader: {
        userId: user?.id || user?.email || user?.name || 'guest', 
      },
      cartDetails: [
        {
          productId: product.productId,
          count: quantity,
        },
      ],
    };

    try {
      await updateCartItem(cartDto); 
      toast.success(`${quantity} "${product.name}" added to cart!`);
      onHide();
    } catch (error) {
      toast.error('Failed to add item to cart.');
    }
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
          style={{ objectFit: 'contain', maxHeight: '300px', width: '100%' }}
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


/* import React, { useState } from 'react';
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

export default ProductDetails; */