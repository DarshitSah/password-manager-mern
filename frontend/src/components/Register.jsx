import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '', regNo: '', marks: '', address: '', email: '', masterPassword: ''
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
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert("Registration Successful!");
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-glow"></div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 style={{ fontSize: '2.6rem', fontWeight: '700', color: 'white', margin: '0 0 8px 0' }}>
            Create Account
          </h1>
          <p style={{ color: '#e0d0ff' }}>Secure Password Manager</p>
        </div>

        <div className="auth-form-area">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label className="auth-label">Full Name <span style={{color: '#f87171'}}>*</span></label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="auth-input" placeholder="Enter full name" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="auth-label">Reg No <span style={{color: '#f87171'}}>*</span></label>
                <input type="text" name="regNo" value={form.regNo} onChange={handleChange} required className="auth-input" placeholder="234101000" />
              </div>
              <div>
                <label className="auth-label">Marks</label>
                <input type="number" name="marks" value={form.marks} onChange={handleChange} className="auth-input" placeholder="Marks" />
              </div>
            </div>

            <div>
              <label className="auth-label">Address</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} className="auth-input" placeholder="Your address" />
            </div>

            <div>
              <label className="auth-label">Email <span style={{color: '#f87171'}}>*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="auth-input" placeholder="enter@gmail.com" />
            </div>

            <div>
              <label className="auth-label">Master Password <span style={{color: '#f87171'}}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="masterPassword" 
                  value={form.masterPassword} 
                  onChange={handleChange} 
                  required
                  className="auth-input" 
                  style={{ paddingRight: '10px' }}
                  placeholder="Create strong password" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {error && <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#c4b5fd' }}>
            Already have an account? <a href="/" style={{ color: '#e0bbff' }}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;