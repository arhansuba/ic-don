// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/EigenLayerOracle.sol";

contract EigenLayerOracleScript is Script {
    function run(uint256 minimumStake, uint256 rewardAmount) external {
        // Replace with the private key of the deployer. Ensure it is secure.
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        // Start broadcasting transactions from the deployer
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the EigenLayerOracle contract
        new EigenLayerOracle(minimumStake, rewardAmount);

        // Example to initialize the contract with parameters
        // You may adjust or add functions as per your contract requirements

        // End the broadcast of transactions
        vm.stopBroadcast();
    }
}
