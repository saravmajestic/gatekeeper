const mintNFT = async (gameContract, productId, licenseKey, meta) => {
  await gameContract.mintLicenseNFT(productId, licenseKey, meta);
};
const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("GateKeeper");
  const gameContract = await gameContractFactory.deploy();
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  await mintNFT(gameContract, "Windows 11", "12345678", "{version: 'Home'}");
  await mintNFT(
    gameContract,
    "Adobe Photoshop",
    "87654321",
    "{discount: 'student'}"
  );
  await mintNFT(gameContract, "Sketch", "aabbccdd", "{validity: 1}");

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
