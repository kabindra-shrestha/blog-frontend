import React from 'react';
import './App.css'; // Import your global CSS styles
import AppRouter from './routes/Router'; // Import the router configuration

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Platform</h1>
        {/* You can add navigation links here */}
      </header>
      <main>
        <AppRouter />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Blog Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
