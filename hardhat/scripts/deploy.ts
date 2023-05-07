import { ethers } from "hardhat";

async function main() {
  const DrugPrescriptionSystemContract = await ethers.getContractFactory("DrugPrescriptionMonitoringSystem")

  const contract = await DrugPrescriptionSystemContract.deploy();
  console.log("Contract deployed at", contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
