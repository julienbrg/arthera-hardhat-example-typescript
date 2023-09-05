const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Keita", function () {

  async function deployContracts() {
    const [owner, alice, bob] = await ethers.getSigners();
    const Keita = await ethers.getContractFactory("Keita");
    const keita = await Keita.deploy();
    return { keita, owner, alice, bob };
  }

  describe("Deployment", function () {
    it("Should set the right initial value", async function () {
      const { keita } = await loadFixture(deployContracts);
      expect(await keita.wins()).to.equal(0);
    });
  });

  describe("Interactions", function () {
    it("Should win the talent contest", async function () {
      const { keita } = await loadFixture(deployContracts);
      const winsBeforeDance = Number(await keita.wins())
      await keita.dance()
      expect(await keita.wins()).to.equal(winsBeforeDance + 1);
    });
  });
});