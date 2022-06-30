import { Box, Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import gateKeeperAbi from "../../abis/GateKeeper.json";

type Props = {
  afterMint: () => void;
};
const ProductIds = [
  "Windows 11",
  "Age of Empires",
  "Adobe Photoshop",
  "Sketch",
];
const Mint = ({ afterMint }: Props) => {
  const [isMinting, setIsMinting] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const onLicenseMint = async (
    sender: string,
    tokenId: string,
    productId: string
  ) => {
    console.log(
      `LicenseNFTMinted - sender: ${sender} tokenId: ${tokenId} productID: ${productId}`
    );
    setIsMinting(false);
  };
  useEffect(() => {
    if (contract) {
      contract.on("LicenseMinted", onLicenseMint);
    }

    return () => {
      if (contract) {
        contract.off("LicenseMinted", onLicenseMint);
      }
    };
  }, [contract]);
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
        gateKeeperAbi.abi,
        signer
      );

      /*
       * This is the big difference. Set our gameContract in state.
       */
      setContract(gameContract);
    } else {
      console.log("Ethereum object not found");
    }
  }, []);
  const mintLicense = async () => {
    try {
      if (contract) {
        setIsMinting(true);
        const productID =
          ProductIds[Math.floor(Math.random() * ProductIds.length)];
        const productLicense = Math.random().toString(36).slice(0, 16);
        console.log("Minting  in progress...", { productID, productLicense });
        const mintTxn = await contract.mintLicenseNFT(
          productID,
          productLicense
        );
        await mintTxn.wait();
        console.log("mintTxn:", mintTxn);
        afterMint();
      }
    } catch (error) {
      setIsMinting(false);
      console.warn("MintAction Error:", error);
    }
  };
  return (
    <Box>
      {isMinting && (
        <Typography variant="body1">Minting in progress...</Typography>
      )}
      <Button variant="contained" onClick={mintLicense}>
        Add new license to my wallet
      </Button>
    </Box>
  );
};

export default Mint;
