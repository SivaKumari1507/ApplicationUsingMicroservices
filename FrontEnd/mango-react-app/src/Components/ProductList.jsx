import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
            .then(res => setProducts(res.data.result))
            .catch(err => toast.error('Failed to load products.'));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id)
                .then(() => {
                    toast.success('Product deleted successfully.');
                    setProducts(products.filter(p => p.productId !== id));
                })
                .catch(() => toast.error('Failed to delete product.'));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Product List</h2>
            {user?.role === 'ADMIN' && (
                <div className="text-end mb-3">
                    <button className="btn btn-success" onClick={() => navigate('/products/add')}>
                        Add Product
                    </button>
                </div>
            )}
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.productId}>
                        <div className="card h-100 shadow-sm">
                            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>₹{product.price}</strong></p>
                                <p className="card-text"><small className="text-muted">{product.categoryName}</small></p>
                                {user?.role === 'ADMIN' && (
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-outline-primary" onClick={() => navigate(`/products/edit/${product.productId}`)}>Edit</button>
                                        <button className="btn btn-outline-danger" onClick={() => handleDelete(product.productId)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;