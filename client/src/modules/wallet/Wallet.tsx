import useWalletAccount from "../account/useWalletAccount";

const Wallet = () => {
  const { connectWalletAction } = useWalletAccount();

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
