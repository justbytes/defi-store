const { ethers } = require("hardhat");
const hre = require("hardhat");
const { items } = require("../src/items.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();

  const DefiStore = await hre.ethers.getContractFactory("DefiStore");
  const defiStore = await DefiStore.deploy();
  await defiStore.deployed();

  console.log(`Deployed contract at: ${defiStore.address}.`);

  //List items
  for (let i = 0; i < items.length; i++) {
    const transaction = await defiStore
      .connect(deployer)
      .list(
        items[i].id,
        items[i].name,
        items[i].category,
        items[i].image,
        tokens(items[i].price),
        items[i].rating,
        items[i].stock
      );

    await transaction.wait();

    console.log(`Listed item ${items[i].id}: ${items[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
