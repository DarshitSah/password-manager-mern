import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Eye, Plus, BarChart3, Home } from 'lucide-react';
import ViewPasswords from './ViewPasswords';
import AddPassword from './AddPassword';
import Aggregation from './Aggregation';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else navigate('/');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <div className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Home size={28} />
            <h1 style={{ fontSize: '1.9rem', fontWeight: '700', margin: 0 }}>SecurePass</h1>
          </div>

          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            color: 'white', padding: '8px 18px', borderRadius: '10px', cursor: 'pointer'
          }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div style={{ display: 'flex', minHeight: '620px' }}>

          <div className="dashboard-sidebar">
            <div onClick={() => setActiveTab('menu')} className={`dashboard-menu-item ${activeTab === 'menu' ? 'active' : ''}`}>
              <Home size={20} /> Dashboard
            </div>

            <div onClick={() => setActiveTab('view')} className={`dashboard-menu-item ${activeTab === 'view' ? 'active' : ''}`}>
              <Eye size={20} /> View Passwords
            </div>

            <div onClick={() => setActiveTab('add')} className={`dashboard-menu-item ${activeTab === 'add' ? 'active' : ''}`}>
              <Plus size={20} /> Add Password
            </div>

            <div onClick={() => setActiveTab('stats')} className={`dashboard-menu-item ${activeTab === 'stats' ? 'active' : ''}`}>
              <BarChart3 size={20} /> Analytics
            </div>
          </div>

          <div className="dashboard-content">
            {activeTab === 'menu' && (
              <div style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h2 style={{ color: 'white', fontSize: '2.2rem' }}>Welcome, {user.name}!</h2>
                <p style={{ color: '#c4b5fd', marginTop: '10px' }}>Select an option from the left menu</p>
              </div>
            )}

            {activeTab === 'view' && <ViewPasswords setActiveTab={setActiveTab} />}
            {activeTab === 'add' && <AddPassword setActiveTab={setActiveTab} />}
            {activeTab === 'stats' && <Aggregation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;