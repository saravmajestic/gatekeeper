import { useEffect } from "react";
type Props = {
  setCurrentAccount: (account: string) => void;
  setIsLoading: (isLoading: boolean) => void;
};
const Wallet = ({ setCurrentAccount, setIsLoading }: Props) => {
  /*
   * Start by creating a new action that we will run on component load
   */
  // Actions
  const checkIfWalletIsConnected = async () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      alert(
        "We support only metamask wallet now. Please add your metamask wallet."
      );
      setIsLoading(false);
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
    setIsLoading(false);
  };

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
  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="connect-wallet-container">
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWalletAction}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Wallet;
