import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductList.css';
import { useAuth } from '../Context/AuthContext';



function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data.result))
      .catch(err => {
        console.error('Error fetching products:', err);
        toast.error('Failed to load products.');
      });
  }, []);

  const handleDelete = (id) => {
    if(user?.role!=='ADMIN'){
       toast.error('Only Admin can create coupons');
       return;
     }
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
        .then(() => {
          setProducts(products.filter(p => p.productId !== id));
          toast.success('Product deleted successfully!');
        })
        .catch(err => {
          console.error('Error deleting product:', err);
          toast.error('Failed to delete product.');
        });
    }
  };

 const goToCreatePage = () => {
    if(user?.role!=='ADMIN'){
       toast.error('Only Admin can create coupons');
       return;
     }
    navigate('/products/add');
  };

  const handleEdit = (id) => {
    if(user?.role!=='ADMIN'){
       toast.error('Only Admin can create coupons');
       return;
     }
    navigate(`/products/edit/${id}`);
  };

  return (
    <div className="product-table-container">
      <div className="header-row">
        <h2>Product List</h2>
        <button className="create-btn" onClick={goToCreatePage}>Create Product</button>
      </div>

      <table className="product-table met-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th><plaintext>Actions</plaintext> </th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productId}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹{product.price.toFixed(2)}</td>
              <td>{product.categoryName}</td>
              <td>
              <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEdit(product.productId)}>✏️</button>
              <button className="btn btn-outline-danger btn-sm me-1" onClick={() => handleDelete(product.productId)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList; 

 


/* import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext'; 
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data.result))
      .catch(err => {
        console.error('Error fetching products:', err);
        toast.error('Failed to load products.');
      });
  }, []);

  const showNotAccessible = () => {
    toast.warn('You do not have access to perform this action.');
  };

  const handleDelete = (id) => {
    if (!isAdmin) {
      showNotAccessible();
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
        .then(() => {
          setProducts(products.filter(p => p.productId !== id));
          toast.success('Product deleted successfully!');
        })
        .catch(err => {
          console.error('Error deleting product:', err);
          toast.error('Failed to delete product.');
        });
    }
  };

  const goToCreatePage = () => {
    if (isAdmin) {
      navigate('/products/add');
    } else {
      showNotAccessible();
    }
  };

  const handleEdit = (id) => {
    if (isAdmin) {
      navigate(`/products/edit/${id}`);
    } else {
      showNotAccessible();
    }
  };

  return (
    <div className="product-table-container">
      <div className="header-row">
        <h2>Product List</h2>
        <button className="create-btn" onClick={goToCreatePage}>Create Product</button>
      </div>

      <table className="product-table met-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productId}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹{product.price.toFixed(2)}</td>
              <td>{product.categoryName}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-1"
                  onClick={() => handleEdit(product.productId)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-outline-danger btn-sm me-1"
                  onClick={() => handleDelete(product.productId)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList; */

