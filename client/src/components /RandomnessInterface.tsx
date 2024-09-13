import React, { useState } from 'react';
import { ethers } from 'ethers';
import RandomnessABI from '../abis/Randomness.json';

const RandomnessInterface: React.FC = () => {
  const [seed, setSeed] = useState('');
  const [requestId, setRequestId] = useState('');
  const [randomValue, setRandomValue] = useState('');

  const createRandomRequest = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(process.env.RANDOMNESS_CONTRACT_ADDRESS, RandomnessABI, signer);

      const tx = await contract.createRandomRequest(seed);
      const receipt = await tx.wait();
      const event = receipt.events.find((e: { event: string; }) => e.event === 'RandomRequestCreated');
      setRequestId(event.args.id.toString());
    } catch (error) {
      console.error('Error creating random request:', error);
    }
  };

  const generateRandomValue = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(process.env.RANDOMNESS_CONTRACT_ADDRESS, RandomnessABI, signer);

      const tx = await contract.generateRandomValue(requestId);
      await tx.wait();
      
      const request = await contract.getRandomRequest(requestId);
      setRandomValue(request.random_value.toString());
    } catch (error) {
      console.error('Error generating random value:', error);
    }
  };

  return ( // Added return statement
    <div>
      <h2>Randomness Interface</h2>
      <div>
        <input 
          type="number" 
          value={seed} 
          onChange={(e: { target: { value: any; }; }) => setSeed(e.target.value)} 
          placeholder="Enter seed"
        />
        <button onClick={createRandomRequest}>Create Random Request</button>
      </div>
      {requestId && (
        <div>
          <p>Request ID: {requestId}</p>
          <button onClick={generateRandomValue}>Generate Random Value</button>
        </div>
      )}
      {randomValue && <p>Random Value: {randomValue}</p>}
    </div>
  );
};

export default RandomnessInterface;