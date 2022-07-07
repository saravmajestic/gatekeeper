import { Box, Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useWalletAccount from "../account/useWalletAccount";
import { getRandomString } from "../common/constants";
import { PRODUCTS } from "../common/products";
import { getContract } from "../contract/utils";

type Props = {
  afterMint: () => void;
};

const Mint = ({ afterMint }: Props) => {
  const [isMinting, setIsMinting] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [searchParams] = useSearchParams();
  const productID = searchParams.get("product");
  const purchasedProduct = PRODUCTS.find((product) => product.id === productID);

  const { isLoadingAccount, currentAccount, connectWalletAction } =
    useWalletAccount();

  const onLicenseMint = async (
    sender: string,
    tokenId: string,
    productId: string
  ) => {
    console.log(
      `LicenseNFTMinted - sender: ${sender} tokenId: ${tokenId} productID: ${productId}`
    );
    alert("License added to your wallet!");
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
      setContract(getContract());
    } else {
      console.error("Ethereum object not found");
    }
  }, []);
  const mintLicense = async () => {
    try {
      if (contract) {
        const productLicense = getRandomString();
        const meta = JSON.stringify({
          orderId: searchParams.get("orderId"),
        });
        if (!productID || !searchParams.get("orderId")) {
          alert("Invalid product id or order id");
        }
        setIsMinting(true);
        console.log("Minting  in progress...", {
          productID,
          productLicense,
          meta,
        });
        const mintTxn = await contract.mintLicenseNFT(
          productID,
          productLicense,
          meta
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
      {isLoadingAccount && (
        <Typography variant="body1">Loading account...</Typography>
      )}
      {isMinting && (
        <Typography variant="body1">Minting in progress...</Typography>
      )}
      {!isLoadingAccount && !currentAccount && (
        <Button onClick={connectWalletAction} variant="contained">
          Connect Wallet
        </Button>
      )}
      <Typography sx={{ mt: 2 }}>
        Add the license for your <i>{purchasedProduct?.name}</i> order
      </Typography>
      <Button
        variant="contained"
        onClick={mintLicense}
        disabled={isMinting || !currentAccount}
        sx={{ mt: 2 }}
      >
        Add license to my wallet
      </Button>
    </Box>
  );
};

export default Mint;
