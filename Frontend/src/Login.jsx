// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.access_token);
        navigate(0)
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="back-arrow" onClick={() => navigate("/")}>
          <ArrowLeft size={24} />
        </div>
        <h1>We Care Wheels</h1>
        <h2>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "24px" }}>
          Please login to your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <a href="/emergency">
            <button type="button" className="button emergency">
              Emergency
            </button>
          </a>

          {error && <div className="error">{error}</div>}
        </form>

        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
