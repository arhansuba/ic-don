// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/Randomness.sol";

contract RandomnessScript is Script {
    function run() external {
        // Replace with the private key of the deployer
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        
        // Start broadcasting transactions from the deployer
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Randomness contract without constructor arguments
        new Randomness();

        // End the broadcast of transactions
        vm.stopBroadcast();
    }
}
