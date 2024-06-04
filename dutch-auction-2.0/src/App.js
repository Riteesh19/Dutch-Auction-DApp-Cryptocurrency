import './App.css';
import React from "react";
import AuctionDeployment from "./components/AuctionDeployment";
import AuctionLookup from "./components/AuctionLookup";
import BidSubmission from "./components/BidSubmission";

function App() {
  return (
    <div className="App">
      <h1>Basic Dutch Auction</h1>
      <AuctionDeployment />
      <AuctionLookup />
      <BidSubmission />
    </div>
  );
}

export default App;


