import { Box } from "@mui/material";
import Mint from "../modules/license/Mint";

const AddLicense = () => {
  const afterMint = () => {
    console.log("license minted");
  };
  return (
    <Box>
      <Mint afterMint={afterMint} />
    </Box>
  );
};

export default AddLicense;
