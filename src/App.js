import { useEffect, useState } from "react";
import { ethers } from "ethers";

//Import components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";
//Import ABI
import DefiStore from "./abis/DefiStore.json";
//Import config file
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState("");
  const [defiStore, setDefiStore] = useState("");
  const [account, setAccount] = useState("");
  const [electronics, setElectronics] = useState("");
  const [clothing, setClothing] = useState("");
  const [toys, setToys] = useState("");
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    const defiStore = new ethers.Contract(
      config[network.chainId].defiStore.address,
      DefiStore,
      provider
    );
    setDefiStore(defiStore);

    const items = [];

    for (var i = 0; i < 9; i++) {
      const item = await defiStore.items(i + 1);
      items.push(item);
    }

    const electronics = items.filter((item) => item.category === "electronics");
    const clothing = items.filter((item) => item.category === "clothing");
    const toys = items.filter((item) => item.category === "toys");

    setElectronics(electronics);
    setClothing(clothing);
    setToys(toys);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Best Sellers</h2>
      {electronics && clothing && toys && (
        <>
          <Section
            title={"Clothing & Jewelry"}
            items={clothing}
            togglePop={togglePop}
          />
          <Section
            title={"Electronics & Gadgets"}
            items={electronics}
            togglePop={togglePop}
          />
          <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
        </>
      )}
      {toggle && (
        <Product
          item={item}
          provider={provider}
          account={account}
          defiStore={defiStore}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;
