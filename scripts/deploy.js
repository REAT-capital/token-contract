const { ethers } = require("hardhat");

async function main() {
  const REATC = await ethers.getContractFactory("REATC");
  
  const companyAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const initialSupply = ethers.parseUnits("50000000", 18);

  const addresses = [companyAddress];
  const balances = [initialSupply];
  
  const reatc = await REATC.deploy(addresses, balances);

  await reatc.waitForDeployment();

  const deployedToAddress = await reatc.getAddress()

  console.log("REATC deployed to:", deployedToAddress);
  console.log("Balance of recipientAddress:", (await reatc.balanceOf(companyAddress)).toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
