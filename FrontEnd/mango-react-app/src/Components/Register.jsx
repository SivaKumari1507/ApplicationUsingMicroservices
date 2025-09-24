import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    password: '',
    role: 'CUSTOMER',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required.';
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5015/api/auth/register', form);

      await axios.post('http://localhost:5015/api/auth/AssignRole', {
        email: form.email,
        role: form.role,
      });

      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-70">
      <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded w-50 bg-light">
        <div className="text-center mb-3">
          <h2 className="text-primary">Register</h2>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            name="phoneNumber"
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-outline-success w-50" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        <div className="text-center mt-3">
          <span>Already have an account?</span>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/login')}
          >
            Login here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;