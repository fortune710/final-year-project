import Contract from "@/hardhat/artifacts/contracts/DrugPrescriptionMonitoringSystem.sol/DrugPrescriptionMonitoringSystem.json";
import { ethers } from "ethers";

const PRIVATE_KEY = "8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e";
const ETHERSCAN_API_KEY = "HXHC8CZC3NV6TIXW6FTJD9MRFSSPZ7DT43"
const CONTRACT_ADDRESS = "0xeE79e47d153317e576Ccd81151bF4Abb3662aA5D";


const provider = new ethers.EtherscanProvider("sepolia", ETHERSCAN_API_KEY);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)


export default function useContract() {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, wallet);
    return contract;
}