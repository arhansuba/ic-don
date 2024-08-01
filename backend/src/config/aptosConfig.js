// aptosConfig.js
const { AptosConfig, Network } = require("@aptos-labs/ts-sdk");

// Configure Aptos SDK for your custom network
const aptosConfig = new AptosConfig({
  network: Network.CUSTOM,
  // Add additional configuration options as needed
  // For example:
  // nodeUrl: "https://custom-network-node-url.com",
  // gasPrice: 1000000000, // Example gas price in wei
});

// Export the configured AptosConfig instance
module.exports = aptosConfig;
