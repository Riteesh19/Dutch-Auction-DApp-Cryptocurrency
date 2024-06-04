import React, { useState } from "react";
import { ethers, utils } from "ethers";
import BasicDutchAuctionArtifact from '../../../../../GitHubMain/v7.0/dutch-auction-2.0/src/contracts/BasicDutchAuction.json';

function BidSubmission() {
  const [address, setAddress] = useState("");
  const [bid, setBid] = useState("");
  const [bidStatus, setBidStatus] = useState("");

  const handleSubmit = async () => {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }
  
    if (!address || !bid) {
      window.alert('Please enter the auction address and bid amount.');
      return;
    }
  
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_INFURA_URL);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(address, BasicDutchAuctionArtifact.abi, signer);
  
    try {
      const transaction = await contract.bid({
        value: utils.parseEther(bid),
        from: account,
        gasLimit: ethers.BigNumber.from(6000000), // max gas limit
        gasPrice: utils.parseUnits('10', 'gwei'), // adjust accordingly
      });
      await transaction.wait();
      setBidStatus("Bid was successful!");
    } catch (error) {
      console.error("An error occurred:", error);
      setBidStatus("Bid was unsuccessful. Error: " + error.message);
    }
  };  

  return (
    <div>
      <input type="text" onChange={e => setAddress(e.target.value)} placeholder="Auction Address" />
      <input type="number" onChange={e => setBid(e.target.value)} placeholder="Bid Amount" />
      <button onClick={handleSubmit}>Bid</button>
      <p>{bidStatus}</p>
    </div>
  );
}

export default BidSubmission;
