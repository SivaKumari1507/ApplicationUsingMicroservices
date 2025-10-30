/* import React from 'react';

const CartItem = ({ item, onRemove, onUpdate }) => {
  const handleQuantityChange = (e) => {
  const newCount = parseInt(e.target.value, 10);
  if (newCount > 0) {
    onUpdate({ ...item, count: newCount });
  }
};

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={item.product.imageUrl || 'https://placehold.co/600x600?text=No+Image'}
        alt={item.product.name}
        className="card-img-top"
      style={{ height: '200px', objectFit: 'contain' }}
      />
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.product.name}</h5>
        <p className="card-text mb-1">Price: ₹{item.product.price}</p>
        <div className="mb-2">
          <label htmlFor={`qty-${item.cartDetailsId}`} className="form-label">Quantity:</label>
          <input
            type="number"
            id={`qty-${item.cartDetailsId}`}
            className="form-control"
            value={item.count}
            min="1"
            onChange={handleQuantityChange}
          />
        </div>
        <button className="btn btn-outline-danger mt-auto" onClick={() => onRemove(item.cartDetailsId)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem; */

import React from 'react';

const CartItem = ({ item, onRemove, onUpdate }) => {
  const handleDecrease = () => {
    if (item.count > 1) {
      onUpdate({ ...item, count: item.count - 1 });
    }
  };

  const handleIncrease = () => {
    onUpdate({ ...item, count: item.count + 1 });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={item.product.imageUrl || 'https://placehold.co/600x600?text=No+Image'}
        alt={item.product.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'contain' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.product.name}</h5>
        <p className="card-text mb-1">Price: ₹{item.product.price}</p>

        <div className="mb-2 d-flex align-items-center">
          <label className="form-label me-2">Quantity:</label>
          <button className="btn btn-outline-secondary me-2" onClick={handleDecrease} disabled={item.count <= 1}>–</button>
          <span>{item.count}</span>
          <button className="btn btn-outline-secondary ms-2" onClick={handleIncrease}>+</button>
        </div>

        <button className="btn btn-outline-danger mt-auto" onClick={() => onRemove(item.cartDetailsId)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;