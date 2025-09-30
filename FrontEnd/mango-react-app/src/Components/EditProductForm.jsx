import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productApi';
import { toast } from 'react-toastify';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productId: id,
    name: '',
    price: '',
    description: '',
    categoryName: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getProductById(id)
      .then(res => {
        const product = res.data.result;
        setForm(product);
      })
      .catch(() => toast.error('Failed to load product details.'));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'Price must be greater than 0.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (!form.categoryName.trim()) newErrors.categoryName = 'Category is required.';
    if (!form.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    updateProduct(form)
      .then(() => {
        toast.success('Product updated successfully!');
        navigate('/products');
      })
      .catch(() => toast.error('Failed to update product.'));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Edit Product</h2>
      <form className="border p-4 rounded shadow bg-light" onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {['name', 'price', 'description', 'categoryName', 'imageUrl'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
              value={form[field]}
              onChange={handleChange}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-outline-primary w-50">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;