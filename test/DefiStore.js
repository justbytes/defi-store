const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("DefiStore", () => {
  let defiStore;

  const ID = 1;
  const NAME = "Shoes";
  const CATEGORY = "Footwear";
  const IMAGE =
    "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
  const COST = tokens(1);
  const RATING = 5;
  const STOCK = 10;

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
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await defiStore.items(ID);

      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });
    it("Emits List event", async () => {
      expect(transaction).to.emit(defiStore, "List");
    });
  });
  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      //List item
      transaction = await defiStore
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
      //Buy item
      transaction = await defiStore.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
    });

    it("Updates buyer order count", async () => {
      const result = await defiStore.orderCount(buyer.address);
      expect(result).to.equal(1);
    });
    it("Adds the order", async () => {
      const order = await defiStore.orders(buyer.address, 1);
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.be.equal(NAME);
    });
    it("Updates contract balance", async () => {
      const result = await ethers.provider.getBalance(defiStore.address);
      expect(result).to.equal(COST);
    });
    it("Emits Buy event", () => {
      expect(transaction).to.emit(defiStore, "Buy");
    });
  });
});
