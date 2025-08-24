// pwa-final/contracts/script/DeployMockUSDC.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {MockUSDC} from "../src/MockUSDC.sol";

contract DeployMockUSDC is Script {
    function run() external returns (MockUSDC) {
        vm.startBroadcast();
        MockUSDC usdc = new MockUSDC();
        console2.log("MockUSDC deployed to:", address(usdc));
        return usdc;
    }
}