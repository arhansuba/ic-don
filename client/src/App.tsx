import React, { useState } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { AccountAddressInput, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import "./App.css";

const aptosConfig = new AptosConfig({ network: Network.CUSTOM });
const aptos = new Aptos(aptosConfig);

function App() {
  const { signAndSubmitTransaction, account } = useWallet();
  const [dataType, setDataType] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);
  const [data, setData] = useState<string | null>(null);

  async function requestData() {
    const transaction: InputTransactionData = {
      data: {
        function: "OracleNetwork::requestData",
        functionArguments: [dataType],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      setRequestId(response.hash); // Simplified for example
      console.log("Request ID:", response.hash);
    } catch (error: any) {
      console.error("Error requesting data:", error);
    }
  }

  async function fetchData() {
    if (!account?.address || requestId === null) return;

    try {
      const result = await aptos.getAccountResource({
        accountAddress: account.address as AccountAddressInput,
        resourceType: `OracleNetwork::DataRequest`, // Ensure this matches `${string}::${string}::${string}`
      });

      setData(result.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Decentralized Oracle Network</h1>
        <WalletSelector />
        <div>
          <label>
            Data Type:
            <input
              type="text"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            />
          </label>
          <button onClick={requestData}>Request Data</button>
        </div>
        <div>
          <button onClick={fetchData}>Fetch Data</button>
          {data && <p>Data: {data}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
