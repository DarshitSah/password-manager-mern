import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Trash2 } from 'lucide-react';

const ViewPasswords = ({ setActiveTab }) => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/passwords', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswords(res.data);
    } catch (err) {
      console.error("Failed to fetch passwords");
    } finally {
      setLoading(false);
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
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        <ArrowLeft size={20} /> Back to Menu
      </button>

      <h2 style={{ color: 'white', marginBottom: '25px', fontSize: '1.8rem' }}>Saved Passwords</h2>

      {loading ? (
        <p style={{ color: '#c4b5fd' }}>Loading passwords...</p>
      ) : passwords.length === 0 ? (
        <p style={{ color: '#c4b5fd', textAlign: 'center', padding: '40px' }}>
          No passwords saved yet. Add some passwords!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {passwords.map((p, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '18px 22px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: 'white', margin: '0 0 6px 0' }}>{p.site}</h3>
                  <p style={{ color: '#c4b5fd', margin: '4px 0' }}>{p.username}</p>
                  <p style={{ color: '#e0d0ff', fontFamily: 'monospace' }}>{p.password}</p>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPasswords;