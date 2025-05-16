async function main(hre) {
  const { ethers, artifacts } = hre;
  const fs = require("fs");
  const path = require("path");

  // Get the contract factories
  const MusicToken = await ethers.getContractFactory("MusicToken");
  const ArtistFunding = await ethers.getContractFactory("ArtistFunding");
  const MockRulesEngine = await ethers.getContractFactory("MockRulesEngine");

  // Deploy the contracts
  console.log("Deploying MusicToken...");
  const musicToken = await MusicToken.deploy();
  await musicToken.waitForDeployment();
  const musicTokenAddress = await musicToken.getAddress();
  console.log("MusicToken deployed to:", musicTokenAddress);

  console.log("Deploying MockRulesEngine...");
  const mockRulesEngine = await MockRulesEngine.deploy();
  await mockRulesEngine.waitForDeployment();
  const mockRulesEngineAddress = await mockRulesEngine.getAddress();
  console.log("MockRulesEngine deployed to:", mockRulesEngineAddress);

  console.log("Deploying ArtistFunding...");
  const artistFunding = await ArtistFunding.deploy();
  await artistFunding.waitForDeployment();
  const artistFundingAddress = await artistFunding.getAddress();
  console.log("ArtistFunding deployed to:", artistFundingAddress);

  // Ensure the frontend/src/contracts directory exists
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Save contract addresses
  const addresses = {
    MusicToken: musicTokenAddress,
    MockRulesEngine: mockRulesEngineAddress,
    ArtistFunding: artistFundingAddress
  };

  fs.writeFileSync(
    path.join(contractsDir, "addresses.json"),
    JSON.stringify(addresses, null, 2)
  );
  console.log("Contract addresses saved to:", path.join(contractsDir, "addresses.json"));

  // Save contract ABIs
  const musicTokenArtifact = await artifacts.readArtifact("MusicToken");
  fs.writeFileSync(
    path.join(contractsDir, "MusicToken.json"),
    JSON.stringify({
      abi: musicTokenArtifact.abi,
      address: musicTokenAddress
    }, null, 2)
  );

  const artistFundingArtifact = await artifacts.readArtifact("ArtistFunding");
  fs.writeFileSync(
    path.join(contractsDir, "ArtistFunding.json"),
    JSON.stringify({
      abi: artistFundingArtifact.abi,
      address: artistFundingAddress
    }, null, 2)
  );

  const mockRulesEngineArtifact = await artifacts.readArtifact("MockRulesEngine");
  fs.writeFileSync(
    path.join(contractsDir, "MockRulesEngine.json"),
    JSON.stringify({
      abi: mockRulesEngineArtifact.abi,
      address: mockRulesEngineAddress
    }, null, 2)
  );
  console.log("Contract ABIs saved");
}

// Execute the deployment
main(require("hardhat"))
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
