// test/REATCTest.js
const { expect } = require("chai");

describe("REATC Token", function() {
  let REATC;
  let reatc;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    REATC = await ethers.getContractFactory("REATC");
    reatc = await REATC.deploy([owner.address], [50000000]);
    await reatc.deployed();
  });

  it("Should have correct initial values", async function () {
    expect(await reatc.name()).to.equal("Reat capital");
    expect(await reatc.symbol()).to.equal("REATC");
    expect(await reatc.decimals()).to.equal(18);
    expect(await reatc.totalSupply()).to.equal(50000000);

    const ownerBalance = await reatc.balanceOf(owner.address);
    expect(ownerBalance).to.equal(50000000);
  });

  it("Should transfer tokens between accounts", async function () {
    // Transfer tokens from owner to addr1
    await reatc.transfer(addr1.address, 1000);
    const addr1Balance = await reatc.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(1000);

    // Transfer tokens from addr1 to addr2
    await reatc.connect(addr1).transfer(addr2.address, 500);
    const addr2Balance = await reatc.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(500);
  });

  it("Should fail if trying to transfer more tokens than balance", async function () {
    const initialOwnerBalance = await reatc.balanceOf(owner.address);

    // Try to transfer more tokens than the owner has
    await expect(reatc.transfer(addr1.address, initialOwnerBalance.add(1))).to.be.revertedWith("REATC: transfer amount exceeds balance");
  });

  it("Should update balances after transfer", async function () {
    const initialOwnerBalance = await reatc.balanceOf(owner.address);

    // Transfer tokens from owner to addr1
    await reatc.transfer(addr1.address, 1000);

    const finalOwnerBalance = await reatc.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(1000));

    const addr1Balance = await reatc.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(1000);
  });
});
