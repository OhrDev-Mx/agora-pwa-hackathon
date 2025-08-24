// pwa-final/src/config/index.ts

// Reemplaza esta dirección con la ÚLTIMA que te dio Anvil
export const agoraEngineAddress = '0x300BF1DA8c6dE63391B69C729D2da1871437073F'; 

export const agoraEngineABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "creatorHandles",
    "inputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ],
    "outputs": [ { "name": "", "type": "string", "internalType": "string" } ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "creators",
    "inputs": [ { "name": "", "type": "string", "internalType": "string" } ],
    "outputs": [
      { "name": "wallet", "type": "address", "internalType": "address" },
      { "name": "platform", "type": "string", "internalType": "string" },
      { "name": "handle", "type": "string", "internalType": "string" },
      { "name": "isRegistered", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllCreatorHandles",
    "inputs": [],
    "outputs": [ { "name": "", "type": "string[]", "internalType": "string[]" } ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isCreatorWallet",
    "inputs": [ { "name": "", "type": "address", "internalType": "address" } ],
    "outputs": [ { "name": "", "type": "bool", "internalType": "bool" } ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [ { "name": "", "type": "address", "internalType": "address" } ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerCreator",
    "inputs": [
      { "name": "_platform", "type": "string", "internalType": "string" },
      { "name": "_handle", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "tip",
    "inputs": [
      { "name": "_handle", "type": "string", "internalType": "string" },
      { "name": "_message", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [ { "name": "newOwner", "type": "address", "internalType": "address" } ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "CreatorRegistered",
    "inputs": [
      { "name": "wallet", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "platform", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "handle", "type": "string", "indexed": false, "internalType": "string" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TipSent",
    "inputs": [
      { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "from", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "message", "type": "string", "indexed": false, "internalType": "string" }
    ],
    "anonymous": false
  },
  { "type": "error", "name": "OwnableInvalidOwner", "inputs": [ { "name": "owner", "type": "address", "internalType": "address" } ] },
  { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [ { "name": "account", "type": "address", "internalType": "address" } ] }
] as const;
export const mockUSDCAddress = '0x70aeF628aF67616fcdD3f82a0023fe23E9FC456B';