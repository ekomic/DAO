const { ethers } = require("hardhat");
const { CHRIS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the ChrisDAO contract
  const ChrisDAO = await ethers.getContractFactory("ChrisDAO");
  const chrisDAO = await ChrisDAO.deploy(
    fakeNftMarketplace.address,
    CHRIS_NFT_CONTRACT_ADDRESS,
    {
      value: ethers.utils.parseEther("0.1"),
    }
  );
  await chrisDAO.deployed();

  console.log("ChrisDAO deployed to: ", chrisDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });