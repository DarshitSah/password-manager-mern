import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const AddPassword = ({ setActiveTab }) => {
  const [form, setForm] = useState({
    site: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/passwords', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Password saved successfully!");
      setForm({ site: '', username: '', password: '' });
    } catch (err) {
      alert("Failed to save password");
    }
  };

  return (
    <div>
      <button 
        onClick={() => setActiveTab('menu')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: '#a5b4fc', 
          background: 'none', 
          border: 'none', 
          marginBottom: '25px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        <ArrowLeft size={20} /> Back to Menu
      </button>

      <h2 style={{ color: 'white', marginBottom: '25px', fontSize: '1.8rem' }}>Add New Password</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: '#ddd' }}>Website</label>
          <input 
            type="text" 
            name="site" 
            value={form.site} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
            placeholder="e.g., google.com, facebook.com" 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: '#ddd' }}>Username / Email</label>
          <input 
            type="text" 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
            placeholder="darshit@gmail.com" 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: '#ddd' }}>Password</label>
          <input 
            type="text" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
            placeholder="Enter password" 
          />
        </div>

        <button 
          type="submit" 
          style={{
            marginTop: '15px',
            padding: '16px',
            background: 'linear-gradient(to right, #8b5cf6, #c026d3)',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Save Password
        </button>
      </form>
    </div>
  );
};

export default AddPassword;