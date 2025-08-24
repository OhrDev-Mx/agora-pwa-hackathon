// pwa-final/contracts/src/AgoraEngine.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgoraEngine is Ownable {
    struct Creator {
        address wallet;
        string platform;
        string handle;
    }

    mapping(string => Creator) public creators;
    mapping(address => bool) public isCreatorWallet;
    string[] public creatorHandles;

    function getAllCreatorHandles() public view returns (string[] memory) {
        return creatorHandles;
    }

    event CreatorRegistered(address indexed wallet, string platform, string handle);
    event TipSent(address indexed to, address indexed from, uint256 amount, string message);

    constructor() Ownable(msg.sender) {}

    function registerCreator(string memory _platform, string memory _handle) public {
        address sender = msg.sender;
        // La comprobación clave: si la wallet del creador es la dirección 0, no existe.
        require(creators[_handle].wallet == address(0), "AgoraEngine: Handle already registered");
        require(!isCreatorWallet[sender], "AgoraEngine: Wallet already registered");

        creators[_handle] = Creator({
            wallet: sender,
            platform: _platform,
            handle: _handle
        });
        isCreatorWallet[sender] = true;
        creatorHandles.push(_handle);
        emit CreatorRegistered(sender, _platform, _handle);
    }

    function tip(string memory _handle, string memory _message) public payable {
        // **ESTA ES LA LÍNEA DE SEGURIDAD CRÍTICA CORREGIDA**
        // En lugar de un booleano, comprobamos que la wallet del creador no sea la dirección nula.
        // Esto es una garantía 100% infalible de que el creador existe.
        address creatorWallet = creators[_handle].wallet;
        require(creatorWallet != address(0), "AgoraEngine: Creator not found");
        
        require(msg.value > 0, "AgoraEngine: Tip amount must be greater than zero");
        
        (bool success, ) = payable(creatorWallet).call{value: msg.value}("");
        require(success, "AgoraEngine: Transfer failed");
        
        emit TipSent(creatorWallet, msg.sender, msg.value, _message);
    }
}