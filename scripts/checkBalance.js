// scripts/checkBalance.js
async function main() {
    const { ethers } = require("hardhat");
  
    // Get the deployed REATC contract instance
    const REATC = await ethers.getContractFactory("REATC");
    const reatc = REATC.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  
    // Get the balance of the address
    const balance = await reatc.balanceOf("0xdD2FD4581271e230360230F9337D5c0430Bf44C0");
  
    console.log(`Address ${"0xdD2FD4581271e230360230F9337D5c0430Bf44C0"} has REATC balance: ${balance.toString()}`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  