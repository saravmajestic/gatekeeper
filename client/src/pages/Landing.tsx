import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Wallet from "../modules/wallet/Wallet";
import { ethers } from "ethers";
import { transformLicenseData } from "../modules/common/constants";
import gateKeeperAbi from "../abis/GateKeeper.json";
import { License } from "../modules/common/types";
import Mint from "../modules/license/Mint";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [currentUserLicense, setCurrentUserLicense] = useState<License | null>(
    null
  );
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const fetchNFTMetadata = async () => {
    console.log("Checking for license NFT on address:", currentAccount);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gatekeeperContract = new ethers.Contract(
        `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
        gateKeeperAbi.abi,
        signer
      );

      setContract(gatekeeperContract);
      const txn = await gatekeeperContract.getUserLicenses();
      console.log(txn);
      if (txn.productID) {
        console.log("User has license NFT");
        setCurrentUserLicense(transformLicenseData(txn));
      } else {
        console.log("No License NFT found");
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentAccount) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <Box>
      {isLoading && <Box>Loading...</Box>}
      {!currentAccount ? (
        <Wallet
          setCurrentAccount={setCurrentAccount}
          setIsLoading={setIsLoading}
        />
      ) : (
        <Box>
          <Typography variant="h6">
            Current Account: {currentAccount}
          </Typography>
          {currentUserLicense ? (
            <Box>
              <Typography variant="h6">Current License: </Typography>
              <Typography variant="body1">
                ProductId: {currentUserLicense.productID}
              </Typography>
              <Typography variant="body1">
                Product License: {currentUserLicense.productLicenseKey}
              </Typography>
            </Box>
          ) : null}
          {contract && (
            <Mint contract={contract} afterMint={fetchNFTMetadata} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default LandingPage;
