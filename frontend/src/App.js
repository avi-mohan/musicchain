import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your components (we'll create these next)
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import ArtistDashboard from './pages/ArtistDashboard';
import FanDashboard from './pages/FanDashboard';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          
          setProvider(provider);
          setSigner(signer);
          setAccount(account);
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      } else {
        console.log('Please install MetaMask to use this app');
      }
    };
    
    connectWallet();
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Navbar account={account} />
        
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-campaign" element={<CreateCampaign signer={signer} account={account} />} />
            <Route path="/campaign/:id" element={<CampaignDetails signer={signer} account={account} provider={provider} />} />
            <Route path="/artist-dashboard" element={<ArtistDashboard signer={signer} account={account} />} />
            <Route path="/fan-dashboard" element={<FanDashboard signer={signer} account={account} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;