import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/icp_canister';

const OracleDataDisplay: React.FC = () => {
  const [oracleData, setOracleData] = useState<{ value: number; timestamp: number }[]>([]); // Specify type for oracleData

  useEffect(() => {
    const fetchOracleData = async () => {
      const agent = new HttpAgent();
      const actor = Actor.createActor(idlFactory, { agent, canisterId: process.env.ICP_CANISTER_ID });
      const data = await actor.get_oracle_data();
      setOracleData(data);
    };

    fetchOracleData();
    const interval = setInterval(fetchOracleData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Oracle Data</h2>
      <ul>
        {oracleData.map((data, index) => (
          <li key={index}>Value: {data.value}, Timestamp: {new Date(data.timestamp).toLocaleString()}</li> // Use timestamp directly
        ))}
      </ul>
    </div>
  );
};

export default OracleDataDisplay;