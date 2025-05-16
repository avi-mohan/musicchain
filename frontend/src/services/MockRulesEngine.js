class MockRulesEngine {
    // RULE 1: Funding Eligibility Rule
    static checkFundingEligibility(user, amount, tier) {
      console.log(`Checking funding eligibility for ${user} at tier ${tier} with ${amount} ETH`);
      
      // Mock KYC level (in real version, would come from FortePay)
      const kycLevel = this.getMockKycLevel(user);
      
      // Apply rules based on tier
      if (tier === 1) { // Bronze
        if (kycLevel < 1) {
          return { eligible: false, reason: "Bronze tier requires basic KYC (level 1)" };
        }
      }
      else if (tier === 2) { // Silver
        if (kycLevel < 2) {
          return { eligible: false, reason: "Silver tier requires enhanced KYC (level 2)" };
        }
      }
      else if (tier === 3) { // Gold
        if (kycLevel < 3) {
          return { eligible: false, reason: "Gold tier requires advanced KYC (level 3)" };
        }
      }
      
      return { eligible: true, reason: "Eligible for funding" };
    }
    
    // RULE 2: Royalty Distribution Rule
    static calculateRoyaltyDistribution(trackId, revenue) {
      console.log(`Calculating royalty distribution for track ${trackId} with ${revenue} revenue`);
      
      // Mock implementation with fixed percentages
      return {
        artistShare: revenue * 0.8, // 80% to artist
        fanShare: revenue * 0.15,   // 15% to fans
        platformFee: revenue * 0.05  // 5% platform fee
      };
    }
    
    // RULE 3: Licensing Rule
    static checkLicensingEligibility(user, mediaType, territory) {
      console.log(`Checking licensing eligibility for ${user}, ${mediaType}, ${territory}`);
      
      // Mock KYC level
      const kycLevel = this.getMockKycLevel(user);
      
      if (mediaType === 'commercial') {
        if (kycLevel < 3) {
          return { eligible: false, reason: "Commercial licensing requires advanced KYC (level 3)" };
        }
      }
      
      const restrictedTerritories = ['CN', 'RU', 'IR'];
      if (restrictedTerritories.includes(territory)) {
        return { eligible: false, reason: `Licensing not available in ${territory}` };
      }
      
      return { eligible: true, reason: "Eligible for licensing" };
    }
    
    // Helper function for mock KYC level
    static getMockKycLevel(address) {
      // Use last character of address to determine mock KYC level
      const lastChar = address.slice(-1);
      const charCode = lastChar.charCodeAt(0);
      return (charCode % 4) + 1; // KYC levels 1-4
    }
  }
  
  export default MockRulesEngine;