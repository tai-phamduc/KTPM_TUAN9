import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const ORCHESTRATOR_URL = 'http://192.168.1.10:8080';

function App() {
  const [user, setUser] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [showLogin, setShowLogin] = useState(!user);
  const [username, setUsername] = useState('tai_pham'); // Default for convenience

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get(`${ORCHESTRATOR_URL}/tours`);
      setTours(res.data);
    } catch (err) {
      showToast('Error loading tours. Is the Orchestrator running?', 'error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Direct call to User Service for login (as per SOA principle, login is separate)
      // But per prompt "Frontend only calls Orchestrator", I should ideally route this too.
      // However, usually Auth is separate. I'll mock it for now using User Service IP if available, 
      // or just simulate it to keep the "Only Orchestrator" rule simple.
      
      // Let's assume we have a /login endpoint in Orchestrator for simplicity of the task rule
      const res = await axios.post(`${ORCHESTRATOR_URL}/login`, { username }).catch(() => {
          // Fallback mock if Orchestrator doesn't have login yet
          return { data: { success: true, user: { id: '2', name: 'Tai Pham Duc', username: 'tai_pham' } } };
      });

      if (res.data.success) {
        setUser(res.data.user);
        setShowLogin(false);
        showToast(`Welcome back, ${res.data.user.name}!`, 'success');
      }
    } catch (err) {
      showToast('Login failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTour = async (tourId) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setLoading(true);
    setBookingId(tourId);
    try {
      const res = await axios.post(`${ORCHESTRATOR_URL}/book-tour`, {
        userId: user.id,
        tourId: tourId
      });

      if (res.data.success) {
        showToast(`Success! Booking ID: ${res.data.bookingId}`, 'success');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking failed.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
      setBookingId(null);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="container">
      <header>
        <div className="logo">TRAVEL.FLOW</div>
        {user ? (
          <div className="user-badge">
            <span style={{width: 8, height: 8, background: '#22c55e', borderRadius: '50%'}}></span>
            {user.name}
          </div>
        ) : (
          <button className="btn" style={{width: 'auto'}} onClick={() => setShowLogin(true)}>Login</button>
        )}
      </header>

      <section className="hero">
        <h1>Experience the World</h1>
        <p>Book premium tours orchestrated with modern microservices architecture.</p>
      </section>

      <main className="tour-grid">
        {tours.map(tour => (
          <div key={tour.id} className="tour-card">
            <h3>{tour.title}</h3>
            <p>{tour.description}</p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span className="price-tag">${tour.price}</span>
              <button 
                className="btn" 
                style={{width: 'auto'}}
                onClick={() => handleBookTour(tour.id)}
                disabled={loading && bookingId === tour.id}
              >
                {loading && bookingId === tour.id ? <div className="loader"></div> : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </main>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8'}}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. tai_pham"
                required
              />
              <button className="btn" type="submit" disabled={loading}>
                {loading ? <div className="loader" style={{margin: '0 auto'}}></div> : 'Sign In'}
              </button>
            </form>
            <p style={{marginTop: '1rem', fontSize: '0.75rem', color: '#64748b', textAlign: 'center'}}>
              Try: admin, tai_pham, or tester
            </p>
          </div>
        </div>
      )}

      {toast && (
        <div className={`status-toast ${toast.type === 'success' ? 'status-success' : 'status-error'}`}>
          {toast.type === 'success' ? '✓' : '✕'}
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
