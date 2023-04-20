import { ethers } from "hardhat";

async function main() {
  const DrugPrescriptionSystemContract = await ethers.getContractFactory("DrugPrescriptionSystem")

  //const provider = new ethers.providers.AlchemyProvider("goerli", "4i6yxljN8mOdz6YDc2xSKEFmlAQ58bdX");
  //const wallet = new ethers.Wallet("8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e", provider)
  const contract = await DrugPrescriptionSystemContract.deploy();
  console.log("Contract deployed at", contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
