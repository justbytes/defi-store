import { useEffect, useState } from "react";
import { ethers } from "ethers";

//Import components

import Navigation from "./components/Navigation";

function App() {
  const [account, setAccount] = useState("");

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Welcome to Defi Store</h2>
    </div>
  );
}

export default App;
