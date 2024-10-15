require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337, // This is the Chain ID for the Hardhat local network
      // Other network configuration options...
    },
    // Other network configurations...
  },
};


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.formatEther(balance), "ETH");
  });

task("sendTokens", "sends some tokens")
.addParam("recipientAddress", "the receiver address")
.addParam("senderAddress", "the sender address")
.addParam("amount", "the amount to send")
.setAction(async (taskArgs) => {
    const { ethers } = require("hardhat");
  
    const recipientAddress = taskArgs.recipientAddress;
    const senderAddress = taskArgs.senderAddress;
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const amountToSend = ethers.parseEther("120");
  
    if (!recipientAddress || !senderAddress || !contractAddress) {
      console.error("Usage: npx hardhat sendTokens <recipientAddress> <senderAddress> <contractAddress> <amountToSend>");
      process.exit(1);
    }
  
    const REATC = await ethers.getContractFactory("REATC");
    const reatc = await REATC.attach(contractAddress);
  
    await reatc.connect(await ethers.provider.getSigner(senderAddress)).transfer(recipientAddress, amountToSend);
  
    console.log(`Sent ${amountToSend.toString()} REATC tokens from ${senderAddress} to ${recipientAddress}`);
})