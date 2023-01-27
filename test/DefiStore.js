const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ethers");
};

describe("DefiStore", () => {
  let defiStore;

  beforeEach(async () => {
    //setup test accounts
    [deployer, buyer] = await ethers.getSigners();
    //deploys contract
    const DefiStore = await ethers.getContractFactory("DefiStore");
    defiStore = await DefiStore.deploy();
  });

  describe("Deployment", () => {
    it("Check owner", async () => {
      expect(await defiStore.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await defiStore
        .connect(deployer)
        .list(1, "Shoes", "Footwear", "Image", 1, 5, 10);
      await transaction.wait();
    });
    it("Returns item attributes", async () => {
      const item = await defiStore.items(1);
      expect(item.id).to.equal(1);
    });
  });
});
