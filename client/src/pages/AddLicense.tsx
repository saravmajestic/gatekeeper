import { ethers } from "ethers";
import { Box } from "@mui/material";
import { useState } from "react";
import Mint from "../modules/license/Mint";

const AddLicense = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  return <Box>{contract && <Mint afterMint={fetchNFTMetadata} />}</Box>;
};

export default AddLicense;
