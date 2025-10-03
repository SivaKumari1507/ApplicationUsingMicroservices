import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import axios from 'axios';


const HomePage = () => {
  const [products, setProducts] = useState([]);

 useEffect(() => {
  axios.get('http://localhost:5016/api/product')
    .then(response => setProducts(response.data.result))
    .catch(error => console.error('Error fetching products:', error));
}, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Welcome to Mango Footwear</h2>
      <div className="row">
        {products.map(product => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;