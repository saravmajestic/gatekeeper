import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}authenticate`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <Box>
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
          - Purchase a product from <Link to={"/products"}>here</Link>
        </Typography>
        <Typography variant="body1">
          - After order is confirmed, add license to your wallet by clicking
          `Add License to your wallet` button
        </Typography>
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
        <Typography variant="body1">- Add license to your wallet</Typography>
        <Typography variant="body1">
          - [TODO:] Download test app from <Link to="">here</Link>
        </Typography>
        <Typography variant="body1">
          - [TODO:] Click <pre>Add License</pre> button
        </Typography>
        <Typography variant="body1">
          - [TODO:] Select right license from the list
        </Typography>
        <Typography variant="body1">
          - [TODO:] Click <pre>Add License</pre> button
        </Typography>
        <Typography variant="body1">
          - [TODO:] After successful authentication, the downloaded test app
          will take you to landing page
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
