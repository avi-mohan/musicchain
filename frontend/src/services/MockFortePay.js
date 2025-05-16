import React from 'react';

class MockFortePay {
  static getUserKYCLevel(address) {
    // Mock implementation based on address
    const lastChar = address.slice(-1);
    const charCode = lastChar.charCodeAt(0);
    const kycLevel = (charCode % 4) + 1; // Levels 1-4
    
    return {
      address,
      kycLevel,
      status: kycLevel >= 1 ? 'verified' : 'unverified',
      verificationDate: new Date().toISOString()
    };
  }
  
  static KYCVerificationComponent = ({ onComplete }) => {
    return (
      <div className="kyc-verification">
        <h2>Complete KYC Verification</h2>
        <p>Select the verification level you want to complete:</p>
        
        <div className="kyc-levels">
          <button onClick={() => onComplete(1)}>Level 1 - Basic</button>
          <button onClick={() => onComplete(2)}>Level 2 - Enhanced</button>
          <button onClick={() => onComplete(3)}>Level 3 - Advanced</button>
        </div>
      </div>
    );
  }
}

export default MockFortePay;