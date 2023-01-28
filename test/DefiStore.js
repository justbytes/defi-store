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
    it("Trigers List event"),
      async () => {
        expect(transaction).to.emit(defiStore, "List");
      };
  });
});
