import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, BarChart3 } from 'lucide-react';

const Aggregation = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/aggregation/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: '#a5b4fc', 
          background: 'none', 
          border: 'none', 
          marginBottom: '25px',
          cursor: 'pointer'
        }}
      >
        <ArrowLeft size={20} /> Back to Menu
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
        <BarChart3 size={32} style={{ color: '#a855f7' }} />
        <h2 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>Student Analytics</h2>
      </div>

      {loading ? (
        <p style={{ color: '#c4b5fd' }}>Loading analytics...</p>
      ) : stats.length === 0 ? (
        <p style={{ color: '#c4b5fd', textAlign: 'center', padding: '40px' }}>No data available</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {stats.map((group, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ color: '#c4b5fd', marginBottom: '12px' }}>
                Marks Range: <strong style={{ color: 'white' }}>{group._id}</strong> 
                <span style={{ marginLeft: '12px', fontSize: '1.1rem' }}>({group.count} students)</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {group.students.map((student, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '10px 16px',
                    borderRadius: '10px'
                  }}>
                    <span style={{ color: '#ddd' }}>{student.name}</span>
                    <span style={{ color: 'white', fontWeight: '600' }}>{student.marks}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Aggregation;