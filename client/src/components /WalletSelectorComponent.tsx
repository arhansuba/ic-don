import React, { useState } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Wallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
//import { ONCHAIN_BIO } from "../constants"; // Adjust path based on your actual structure
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { ONCHAIN_BIO } from "../constants/constants";
const WalletSelectorComponent: React.FC = () => {
  const { account, connect } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const aptosConfig = new AptosConfig({ network: Network.CUSTOM });
  const aptos = new Aptos(aptosConfig);
  const Wallet = [new PetraWallet()];
  
  const handleWalletSelect = async (wallet: Wallet) => {
    setSelectedWallet(wallet);
    await connect(wallet.name); // Assuming wallet.name is the wallet identifier
    // Perform other actions upon wallet selection
  };

  const fetchBio = async () => {
    if (!account) {
      console.log("No account");
      return;
    }
  
    try {
      const bioResource = await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${ONCHAIN_BIO}::onchain_bio::Bio`
      });

      console.log("Name:", bioResource.name, "Bio:", bioResource.bio);
      // Handle bio data as needed
    } catch (error) {
      console.error("Error fetching bio:", error);
    }
  };

  const registerBio = async () => {
    // Implement registration logic here
  };

  return (
    <div>
      <h2>Select Wallet</h2>
      {/* Adjust props based on wallet-adapter-ant-design requirements */}
      <WalletSelector onSelect={handleWalletSelect} />
      {selectedWallet && (
        <div>
          <h3>Selected Wallet</h3>
          <p>Name: {selectedWallet.name}</p>
          {/* Display other relevant details */}
        </div>
      )}

      {/* Implement additional components for bio registration and display */}
    </div>
  );
};

export default WalletSelectorComponent;
