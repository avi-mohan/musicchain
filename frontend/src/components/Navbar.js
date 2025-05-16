import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ account }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MusicChain</Link>
      </div>
      
      <div className="navbar-menu">
        <Link to="/artist-dashboard">Artist Dashboard</Link>
        <Link to="/fan-dashboard">Fan Dashboard</Link>
        <Link to="/create-campaign">Create Campaign</Link>
      </div>
      
      <div className="wallet-status">
        {account ? (
          <div className="connected">
            <span className="dot"></span>
            Connected: {account.substring(0, 6)}...{account.substring(38)}
          </div>
        ) : (
          <div className="not-connected">
            <span className="dot"></span>
            Not Connected
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;