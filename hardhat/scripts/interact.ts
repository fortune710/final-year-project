//import { ethers } from "hardhat";
import { ethers } from "ethers";
import { Network } from "alchemy-sdk";
import Contract from '../artifacts/contracts/DrugPrescriptionSystem.sol/DrugPrescriptionSystem.json';

const CONTRACT_ADDRESS = "0x5db157bC5D6d911c7aF90E9469260b81195352d1";

async function main() {

    const provider = new ethers.providers.EtherscanProvider("sepolia", "HXHC8CZC3NV6TIXW6FTJD9MRFSSPZ7DT43");
    const wallet = new ethers.Wallet("8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e", provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, wallet);

    //const tx = await contract.AddUser(200,"fortune@gmail.com", "1234", "fortune")
    //await tx.wait()
    const users = await contract.users(200)
    console.log(users)
    //await tx.wait()//
    console.log("done")
}
main();