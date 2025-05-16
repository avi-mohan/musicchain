// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtistFunding is Ownable {
    struct Campaign {
        uint256 id;
        string title;
        address artist;
        uint256 goal;
        uint256 raised;
        bool active;
    }
    
    struct Tier {
        string name;
        uint256 minimumContribution;
        uint256 royaltyPercentage;
    }
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(uint256 => Tier)) public tiers;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    
    uint256 public campaignCount = 0;
    
    event CampaignCreated(uint256 campaignId, string title, address artist);
    event ContributionReceived(uint256 campaignId, address contributor, uint256 amount);
    
    // Updated constructor to pass the initial owner
    constructor() Ownable(msg.sender) {}
    
    function createCampaign(string memory title, uint256 goal) external returns (uint256) {
        campaignCount++;
        uint256 campaignId = campaignCount;
        
        campaigns[campaignId] = Campaign({
            id: campaignId,
            title: title,
            artist: msg.sender,
            goal: goal,
            raised: 0,
            active: true
        });
        
        // Create default tiers
        tiers[campaignId][1] = Tier("Bronze", 0.01 ether, 5); // 0.05%
        tiers[campaignId][2] = Tier("Silver", 0.1 ether, 10); // 0.1%
        tiers[campaignId][3] = Tier("Gold", 1 ether, 100); // 1%
        
        emit CampaignCreated(campaignId, title, msg.sender);
        
        return campaignId;
    }
    
    function contribute(uint256 campaignId, uint256 tierId) external payable {
        Campaign storage campaign = campaigns[campaignId];
        Tier storage tier = tiers[campaignId][tierId];
        
        require(campaign.active, "Campaign not active");
        require(msg.value >= tier.minimumContribution, "Below minimum contribution");
        
        // In a full implementation, Rule 1 would be checked here
        
        campaign.raised += msg.value;
        contributions[campaignId][msg.sender] = msg.value;
        
        emit ContributionReceived(campaignId, msg.sender, msg.value);
        
        if (campaign.raised >= campaign.goal) {
            payable(campaign.artist).transfer(campaign.raised);
            campaign.active = false;
        }
    }
    
    function getCampaign(uint256 campaignId) external view returns (
        uint256 id,
        string memory title,
        address artist,
        uint256 goal,
        uint256 raised,
        bool active
    ) {
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.id,
            campaign.title,
            campaign.artist,
            campaign.goal,
            campaign.raised,
            campaign.active
        );
    }
    
    function getTier(uint256 campaignId, uint256 tierId) external view returns (
        string memory name,
        uint256 minimumContribution,
        uint256 royaltyPercentage
    ) {
        Tier storage tier = tiers[campaignId][tierId];
        return (
            tier.name,
            tier.minimumContribution,
            tier.royaltyPercentage
        );
    }
}