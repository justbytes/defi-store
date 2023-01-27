const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ethers");
};

describe("DefiStore", () => {
  it("Has name", async () => {
    const DefiStore = await ethers.getContractFactory("DefiStore");
    defiStore = await DefiStore.deploy();
    expect(await defiStore.name()).to.equal("DefiStore");
    console.log(defiStore.name);
  });
});
