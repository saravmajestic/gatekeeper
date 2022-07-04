import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { transformLicenseData } from "../modules/common/constants";
import { License } from "../modules/common/types";
import gateKeeperAbi from "../abis/GateKeeper.json";

const AuthenticateToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserLicenses, setCurrentUserLicenses] = useState<
    License[] | null
  >(null);
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

      const txn = await gatekeeperContract.getUserLicenses();
      console.log(txn);
      if (txn.length) {
        console.log("User has license token");
        setCurrentUserLicenses(
          txn.map((license: any) => transformLicenseData(license))
        );
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
      {currentUserLicenses?.length ? (
        <Box>
          <Typography variant="h6">Current Licenses: </Typography>
          {currentUserLicenses.map((license) => (
            <Box
              sx={{
                mb: 1,
                width: "50vw",
                ml: "auto",
                mr: "auto",
                boxShadow:
                  "0px 0px 10px rgba(0, 0, 0, 0.3), inset 0px 0px 25px rgba(255, 255, 255, 0.35)",
              }}
            >
              <Typography variant="body1">
                ProductId: {license.productID}
              </Typography>
              <Typography variant="body1">
                Product License: {license.productLicenseKey}
              </Typography>
              <Typography variant="body1">
                Product Meta: {license.meta}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default AuthenticateToken;
