import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useWalletAccount from "../modules/account/useWalletAccount";
import { transformLicenseData } from "../modules/common/constants";
import { License } from "../modules/common/types";
import { getContract } from "../modules/contract/utils";

const AuthenticateToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [matchingLicenses, setMatchingLicenses] = useState<License[] | null>(
    null
  );
  const [searchParams] = useSearchParams();

  const { isLoadingAccount, currentAccount } = useWalletAccount();
  const fetchNFTMetadata = async () => {
    console.log("Checking for license NFT on address:", currentAccount);
    try {
      const gatekeeperContract = getContract();

      const txn = await gatekeeperContract.getUserLicenses();
      console.log(txn);
      if (txn.length) {
        console.log("User has license token");
        const licenses: License[] = txn.map((license: any) =>
          transformLicenseData(license)
        );
        setMatchingLicenses(
          licenses.filter(
            (license) => license.productID === searchParams.get("productId")
          )
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
  const authUsingLicense = (license: License) => {
    console.log(license);
    alert("To be continued...");
  };
  return (
    <Box>
      {isLoading && isLoadingAccount && <Box>Loading...</Box>}
      {matchingLicenses?.length ? (
        <Box>
          <Typography variant="h6">Matching Licenses: </Typography>
          <List dense sx={{ width: 320, margin: "0 auto", mt: 2 }}>
            {matchingLicenses.map((license) => (
              <>
                <ListItem
                  key={license.productLicenseKey}
                  secondaryAction={
                    <Button onClick={() => authUsingLicense(license)}>
                      Use
                    </Button>
                  }
                >
                  <ListItemText
                    primary={license.productID}
                    secondary={license.meta}
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
      ) : (
        <Typography>No matching licenses</Typography>
      )}
    </Box>
  );
};

export default AuthenticateToken;