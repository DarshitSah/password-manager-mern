import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    masterPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        masterPassword: form.masterPassword
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-glow"></div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 style={{ fontSize: '2.7rem', fontWeight: '700', color: 'white', margin: '0 0 8px 0' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#e0d0ff' }}>Secure Password Manager</p>
        </div>

        <div className="auth-form-area">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            <div>
              <label className="auth-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required
                className="auth-input" 
                placeholder="enter@gmail.com" 
              />
            </div>

            <div>
              <label className="auth-label">Master Password </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="masterPassword" 
                  value={form.masterPassword} 
                  onChange={handleChange} 
                  required
                  className="auth-input" 
                  style={{ paddingRight: '10px' }}
                  placeholder="Enter master password" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {error && <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#c4b5fd' }}>
            Don't have an account? <a href="/register" style={{ color: '#e0bbff' }}>Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;