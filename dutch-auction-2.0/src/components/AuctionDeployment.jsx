
import React, { useState } from "react";
import { ethers } from "ethers";
import BasicDutchAuctionArtifact from '../contracts/BasicDutchAuction.json';


function AuctionDeployment() {
  const [reservePrice, setReservePrice] = useState("");
  const [numBlocksAuctionOpen, setNumBlocksAuctionOpen] = useState("");
  const [offerPriceDecrement, setOfferPriceDecrement] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [address, setAddress] = useState("");

  const handleDeployment = async () => {
    // Ensure that the MetaMask extension is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }
  
    // Request account access from MetaMask
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
  
    // Create an instance of ethers.js and set the provider to Infura
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_INFURA_URL);
    const signer = provider.getSigner();
  
    // Create a new instance of the Contract with the signer
    let contract = new ethers.ContractFactory(BasicDutchAuctionArtifact.abi, BasicDutchAuctionArtifact.bytecode, signer);
  
    // Deploy the contract
    contract = await contract.deploy(reservePrice, numBlocksAuctionOpen, offerPriceDecrement);
    setAddress(contract.address);
  };
  
  return (
    <div>
      <input type="number" onChange={e => setReservePrice(e.target.value)} placeholder="Reserve Price" />
      <input type="number" onChange={e => setNumBlocksAuctionOpen(e.target.value)} placeholder="Num Blocks Auction Open" />
      <input type="number" onChange={e => setOfferPriceDecrement(e.target.value)} placeholder="Offer Price Decrement" />
      <input type="number" onChange={e => setInitialPrice(e.target.value)} placeholder="Initial Price" />
      <button onClick={handleDeployment}>Deploy</button>
      <p>Address: {address}</p>
    </div>
  );
}

export default AuctionDeployment;


