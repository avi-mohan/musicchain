// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockRulesEngine {
    // RULE 1: Funding Eligibility
    function checkFundingEligibility(address user, uint256 amount, uint256 tier) 
        external pure returns (bool eligible, string memory reason) 
    {
        // Simple mock implementation
        if (tier == 3 && amount < 1 ether) {
            return (false, "Gold tier requires minimum 1 ETH");
        }
        
        return (true, "Eligible");
    }
    
    // RULE 2: Royalty Distribution
    function calculateRoyalties(uint256 trackId, uint256 amount)
        external pure returns (address[] memory recipients, uint256[] memory amounts)
    {
        // Mock implementation 
        recipients = new address[](3);
        amounts = new uint256[](3);
        
        // Artist gets 80%
        recipients[0] = address(0x123); // Would be actual artist address
        amounts[0] = amount * 80 / 100;
        
        // Fans get 15%
        recipients[1] = address(0x456); // Would be fan funding contract
        amounts[1] = amount * 15 / 100;
        
        // Platform gets 5%
        recipients[2] = address(0x789); // Platform address
        amounts[2] = amount * 5 / 100;
        
        return (recipients, amounts);
    }
    
    // RULE 3: Licensing Eligibility
    function checkLicensingEligibility(address user, string memory mediaType)
        external pure returns (bool eligible, string memory reason)
    {
        // Mock implementation
        bytes32 mediaTypeHash = keccak256(abi.encodePacked(mediaType));
        bytes32 commercialHash = keccak256(abi.encodePacked("commercial"));
        
        if (mediaTypeHash == commercialHash) {
            // In real implementation, would check KYC level
            return (false, "Commercial licensing requires KYC level 3");
        }
        
        return (true, "Eligible for licensing");
    }
}