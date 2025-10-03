import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ userName: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!form.userName.trim()) newErrors.userName = 'Username is required.';
    if (!form.password.trim()) newErrors.password = 'Password is required.';
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
      const response = await loginUser(form);
      const loginResponse = response.data.result;

      if (loginResponse?.token) {
        login({
          name: loginResponse.user.name,
          email: loginResponse.user.email,
          role: loginResponse.user.role,
          token: loginResponse.token
        });

        toast.success('Login successful!');
        navigate('/Home');
      } else {
        toast.error('Login failed: No token received.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="container mt-0">
    //   <h2 className="mb-4 text-center text-primary">Login</h2>
    //   <form
    //     onSubmit={handleSubmit}
    //     className="border p-5 rounded shadow bg-light"
    //     style={{ maxWidth: '600px', margin: '0 auto' }}
    //   >
    <div class="d-flex justify-content-center align-items-center vh-70">
      <form onSubmit={handleSubmit} class="border p-4 shadow-lg rounded w-50">
        <div class="text-center">
          <h2 class="text-primary">Login</h2>
        </div>
        {/* Username Field */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="userName"
            className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
            value={form.userName}
            onChange={handleChange}
            required
          />
          {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-outline-success w-50" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="text-center mt-3">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/register')}
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;