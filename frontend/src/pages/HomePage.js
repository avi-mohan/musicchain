import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>MusicChain</h1>
        <p>Direct artist funding with automatic royalty distribution</p>
        <div className="cta-buttons">
          <Link to="/artist-dashboard" className="btn btn-primary">I'm an Artist</Link>
          <Link to="/fan-dashboard" className="btn btn-secondary">I'm a Fan</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;