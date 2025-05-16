// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicToken is ERC1155, Ownable {
    uint256 public trackCount = 0;
    
    struct Track {
        uint256 id;
        string title;
        address artist;
        bool active;
    }
    
    mapping(uint256 => Track) public tracks;
    
    // Updated constructor to pass the initial owner
    constructor() ERC1155("") Ownable(msg.sender) {}
    
    function createTrack(string memory title) external returns (uint256) {
        trackCount++;
        uint256 trackId = trackCount;
        
        tracks[trackId] = Track({
            id: trackId,
            title: title,
            artist: msg.sender,
            active: true
        });
        
        // Mint tokens to artist
        _mint(msg.sender, trackId, 100, "");
        
        return trackId;
    }
}