const mintNFT = async (gameContract, productId, licenseKey) => {
  await gameContract.mintLicenseNFT(productId, licenseKey);
};
const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("GateKeeper");
  const gameContract = await gameContractFactory.deploy();
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  await mintNFT(gameContract, "Windows 11", "12345678");
  // await mintNFT(gameContract, "Adobe Photoshop", "87654321");
  // await mintNFT(gameContract, "Sketch", "aabbccdd");

  console.log(await gameContract.getUserLicenses());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
