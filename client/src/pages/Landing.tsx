import { Box, Button, Typography } from "@mui/material";
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
          {contract && <Mint afterMint={fetchNFTMetadata} />}
        </Box>
      )}
      <Box
        sx={{
          textAlign: "left",
          width: "50vw",
          margin: "0 auto",
          padding: 2,
          boxShadow:
            "rgb(0 0 0 / 15%) 0px 4px 4px, rgb(0 0 0 / 20%) 0px 0px 15px",
          "& pre": {
            display: "inline-block",
            background: "#eee",
            padding: 1,
          },
          mt: 2,
        }}
      >
        <Typography variant="h6">What is GateKeeper</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          GateKeeper helps to prevent software piracy by authenticating end
          users through NFTs on chain. Instead of traditional licenses, end
          users will be given NFTs and users can use the NFT to validate their
          access.
        </Typography>
        <Typography variant="h6">How to use GateKeeper?</Typography>
        <Typography variant="body1">
          - Connect your MetaMask Wallet by clicking <pre>Connect Wallet</pre>{" "}
          button.{" "}
          <Button
            href="https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-MetaMask-wallet?utm_source=buildspace.so&utm_medium=buildspace_project"
            target="_blank"
          >
            More details here
          </Button>
        </Typography>
        <Typography variant="body1">
          - Connect to rinkeby test network. Add some ETH using the faucets
          mentioned{" "}
          <Button
            href={
              "https://buildspace.so/p/create-turn-based-nft-game/lessons/deploy-to-rinkeby-opensea"
            }
          >
            here
          </Button>
        </Typography>
        <Typography variant="body1">
          - Click <pre>Add new license to my wallet</pre> button to mint an NFT
          and add to your Wallet
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
