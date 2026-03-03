import React from 'react';

const Dashboard = ({ status, data = [] }) => {
  if (status === 'loading') {
    return (
      <div data-testid="dashboard-loading">
        <h2>Dashboard</h2>
        <div>Loading...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div data-testid="dashboard-error">
        <h2>Dashboard</h2>
        <div style={{ color: 'red' }}>Error loading data. Please try again.</div>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div data-testid="dashboard-empty">
        <h2>Dashboard</h2>
        <div>No data available.</div>
      </div>
    );
  }

  // status === 'loaded'
  return (
    <div data-testid="dashboard-loaded">
      <h2>Dashboard</h2>
      <div>
        <h3>Items ({data.length})</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index} data-testid={`dashboard-item-${index}`}>
              {item.title} - {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;