const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Get the contract factories
  const MusicToken = await hre.ethers.getContractFactory("MusicToken");
  const ArtistFunding = await hre.ethers.getContractFactory("ArtistFunding");
  const MockRulesEngine = await hre.ethers.getContractFactory("MockRulesEngine");

  // Deploy the contracts
  const musicToken = await MusicToken.deploy();
  await musicToken.deployed();
  console.log("MusicToken deployed to:", musicToken.address);

  const mockRulesEngine = await MockRulesEngine.deploy();
  await mockRulesEngine.deployed();
  console.log("MockRulesEngine deployed to:", mockRulesEngine.address);

  const artistFunding = await ArtistFunding.deploy();
  await artistFunding.deployed();
  console.log("ArtistFunding deployed to:", artistFunding.address);

  // Save the contract addresses and ABIs
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Save contract addresses
  const contractAddresses = {
    MusicToken: musicToken.address,
    MockRulesEngine: mockRulesEngine.address,
    ArtistFunding: artistFunding.address
  };

  fs.writeFileSync(
    path.join(contractsDir, "addresses.json"),
    JSON.stringify(contractAddresses, null, 2)
  );
  
  console.log("Contract addresses saved to frontend/src/contracts/addresses.json");

  // Save ABIs
  const musicTokenArtifact = artifacts.readArtifactSync("MusicToken");
  fs.writeFileSync(
    path.join(contractsDir, "MusicToken.json"),
    JSON.stringify(musicTokenArtifact, null, 2)
  );

  const artistFundingArtifact = artifacts.readArtifactSync("ArtistFunding");
  fs.writeFileSync(
    path.join(contractsDir, "ArtistFunding.json"),
    JSON.stringify(artistFundingArtifact, null, 2)
  );

  const mockRulesEngineArtifact = artifacts.readArtifactSync("MockRulesEngine");
  fs.writeFileSync(
    path.join(contractsDir, "MockRulesEngine.json"),
    JSON.stringify(mockRulesEngineArtifact, null, 2)
  );
  
  console.log("Contract ABIs saved to frontend/src/contracts/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });