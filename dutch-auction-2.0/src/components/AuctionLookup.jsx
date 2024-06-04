import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import BasicDutchAuctionArtifact from '../contracts/BasicDutchAuction.json';

function AuctionLookup() {
  const [address, setAddress] = useState("");
  const [auctionInfo, setAuctionInfo] = useState(null);

  const handleLookup = async () => {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_INFURA_URL);
    const contract = new ethers.Contract(address, BasicDutchAuctionArtifact.abi, provider);

    const owner = await contract.owner();
    const reservePrice = ethers.utils.formatEther(await contract.reservePrice());
    const numBlocksAuctionOpen = (await contract.numBlocksAuctionOpen()).toString();
    const offerPriceDecrement = ethers.utils.formatEther(await contract.offerPriceDecrement());
    const initialPrice = ethers.utils.formatEther(await contract.initialPrice());
    const auctionEnd = (await contract.auctionEnd()).toString();
    const winningBid = ethers.utils.formatEther(await contract.winningBid());
    const winningBidder = await contract.winningBidder();
    const startingBlock = (await contract.startingBlock()).toString();

    setAuctionInfo({
      owner,
      reservePrice,
      numBlocksAuctionOpen,
      offerPriceDecrement,
      initialPrice,
      auctionEnd,
      winningBid,
      winningBidder,
      startingBlock
    });
  };

  useEffect(() => {
    if (address) {
      handleLookup();
    }
  }, [address]);

  return (
    <div>
      <input type="text" onChange={e => setAddress(e.target.value)} placeholder="Auction Address" />
      <button onClick={handleLookup}>Show Info</button>
      {auctionInfo && (
        <div>
          <p>Owner: {auctionInfo.owner}</p>
          <p>Reserve Price: {auctionInfo.reservePrice}</p>
          <p>Num Blocks Auction Open: {auctionInfo.numBlocksAuctionOpen}</p>
          <p>Offer Price Decrement: {auctionInfo.offerPriceDecrement}</p>
          <p>Initial Price: {auctionInfo.initialPrice}</p>
          <p>Auction End: {auctionInfo.auctionEnd}</p>
          <p>Winning Bid: {auctionInfo.winningBid}</p>
          <p>Winning Bidder: {auctionInfo.winningBidder}</p>
          <p>Starting Block: {auctionInfo.startingBlock}</p>
        </div>
      )}
    </div>
  );
}

export default AuctionLookup;
