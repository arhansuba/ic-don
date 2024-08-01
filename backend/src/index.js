const { Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");
const axios = require("axios");
const dotenv = require('dotenv');
const fetchData = require('./services/dataFetcher');
const submitData = require('./services/contractInteractor');

// Load environment variables from .env file
dotenv.config();

// Initialize Aptos SDK with custom network configuration
const aptosConfig = new AptosConfig({ network: Network.CUSTOM });
const aptos = new Aptos(aptosConfig);

// Example usage
const main = async () => {
  const dataApiUrl = "https://api.example.com/data";
  const requestId = 1;

  try {
    const data = await fetchData(dataApiUrl);
    if (data) {
      await submitDataToContract(requestId, data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Function to fetch data from an API
async function fetchData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to submit data to the smart contract
async function submitDataToContract(requestId, data) {
  const transaction = {
    data: {
      function: "OracleNetwork::submitData",
      functionArguments: [requestId, data],
    },
  };

  try {
    const response = await aptos.signAndSubmitTransaction(transaction);
    console.log(`Transaction Hash: ${response.hash}`);
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

// Execute main function
main();

module.exports = { fetchData, submitDataToContract };
