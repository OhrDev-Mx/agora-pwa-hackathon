// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol"; // <--- AÑADIR ESTA LÍNEA
import {AgoraEngine} from "../src/AgoraEngine.sol";

contract DeployAgoraEngine is Script {
    function run() external returns (AgoraEngine) {
        vm.startBroadcast();
        AgoraEngine agora = new AgoraEngine();
        vm.stopBroadcast();

        // Usar console2.log en lugar de console.log
        console2.log("AgoraEngine deployed to:", address(agora)); // <--- CORREGIR ESTA LÍNEA

        return agora;
    }
}