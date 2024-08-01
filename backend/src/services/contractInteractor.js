const { Aptos, InputTransactionData, EventListener } = require("@aptos-labs/ts-sdk");
const dotenv = require('dotenv');  // If using environment variables

// Load environment variables if needed
dotenv.config();

// Initialize Aptos instance (consider passing AptosConfig for network configuration)
const aptos = new Aptos();

/**
 * Function to submit data to the blockchain
 * @param {string} requestId - The ID of the data request
 * @param {string} data - The data to be submitted
 */
async function submitData(requestId, data) {
  const transaction = {
    data: {
      function: "OracleNetwork::submitData",
      functionArguments: [requestId, data],
    },
  };

  try {
    // Sign and submit transaction
    const response = await aptos.signAndSubmitTransaction(transaction);
    console.log(`Transaction Hash: ${response.hash}`);

    // Wait for transaction confirmation
    await waitForTransactionConfirmation(response.hash);

    // Listen for completion event
    const eventListener = new EventListener("OracleNetwork::DataSubmitted", (event) => {
      console.log("Data submitted event received:", event);
      // Optionally process event data here
    });
    eventListener.startListening();

  } catch (error) {
    console.error("Error submitting data:", error);
    throw error; // Rethrow the error for higher-level handling
  }
}

/**
 * Function to wait for transaction confirmation
 * @param {string} transactionHash - Hash of the submitted transaction
 */
async function waitForTransactionConfirmation(transactionHash) {
  const receipt = await aptos.waitForTransaction({ transactionHash });
  console.log(`Transaction confirmed at block ${receipt.blockNumber}`);
}

module.exports = submitData;
