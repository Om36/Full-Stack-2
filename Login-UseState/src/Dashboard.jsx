import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
    const navigate = useNavigate();
    
    const [user] = useState(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData;
    });
    const [loading] = useState(false);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
        }
    }, []);

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    if (loading) {
        return <div className="dashboard">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>
            <main className="dashboard-content">
                <h2>Welcome, {user?.name || 'User'}</h2>
                <p>Your dashboard content goes here.</p>
            </main>
        </div>
    );
}