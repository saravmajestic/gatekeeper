import { useEffect, useState } from "react";

const useWalletAccount = () => {
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      alert(
        "We support only metamask wallet now. Please add your metamask wallet."
      );
      setIsLoadingAccount(false);
      return;
    }
    console.log("We have the ethereum object", ethereum);
    /*
     * Check if we're authorized to access the user's wallet
     */
    const accounts = await ethereum.request({ method: "eth_accounts" });

    /*
     * User can have multiple authorized accounts, we grab the first one if its there!
     */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
    setIsLoadingAccount(false);
  };

  useEffect(() => {
    setIsLoadingAccount(true);
    checkIfWalletIsConnected();
  }, []);
  return { isLoadingAccount, currentAccount, connectWalletAction };
};

export default useWalletAccount;
