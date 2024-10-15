// scripts/sendTokens.js
async function main() {
    const { ethers } = require("hardhat");
  
    // Parse command line arguments
    const recipientAddress = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
    const senderAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const amountToSend = ethers.parseEther("525");
  
    if (!recipientAddress || !senderAddress || !contractAddress) {
      console.error("Usage: npx hardhat sendTokens <recipientAddress> <senderAddress> <contractAddress> <amountToSend>");
      process.exit(1);
    }
  
    // Get the deployed contract instance
    const REATC = await ethers.getContractFactory("REATC");
    const reatc = await REATC.attach(contractAddress);
  
    // Define the amount of tokens to send
    // const amountToSend = parseEther("100"); // Sending 100 tokens
  
    // Send tokens from senderAddress to recipientAddress
    await reatc.connect(await ethers.provider.getSigner(senderAddress)).transfer(recipientAddress, amountToSend);
  
    console.log(`Sent ${amountToSend.toString()} REATC tokens from ${senderAddress} to ${recipientAddress}`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  