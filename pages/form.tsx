import { Alchemy, Network, Utils, Wallet, AlchemyProvider } from "alchemy-sdk";
import { InterfaceAbi, ethers } from "ethers";
import { NextPage } from "next";
import { FormEvent } from "react";
import abi from '../contract-abi/DrugPrescriptionSystem.json'

const UserForm: NextPage = () => {

    const alchemy = new Alchemy({
        url: process.env.API_URL,
        network: Network.ETH_SEPOLIA
    });

    const addUser = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const fields = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(fields);

        const wallet = new Wallet("0x01f3faccdb424c265fce526197845ed5a46aa4ea5ebf85298b748795c9222392", alchemy);
        const nonce = await alchemy.core.getTransactionCount(wallet.getAddress());

        const contract = new ethers.Contract("0x8a01AbC4902481d77Ad76FfF209d751Bc0Ff82A3", abi.abi)
        const rawTransaction = await wallet.signTransaction({
            to: "0x8a01AbC4902481d77Ad76FfF209d751Bc0Ff82A3",
            value: Utils.parseEther("0.001"),
            gasLimit: "32000",
            maxPriorityFeePerGas: Utils.parseUnits("5","gwei"),
            maxFeePerGas: Utils.parseUnits("20", "gwei"),
            type: 2,
            nonce: nonce,
            data: contract.addUser(data.email, data.password, data.name) as any

        })
        const transaction = await alchemy.transact.sendTransaction(rawTransaction);
        console.log(transaction)
    }

    return(
        <form onSubmit={addUser}>
            <input name="name" placeholder="Name"/>
            <input name="email" type="email" placeholder="Email"/>
            <input name="password" type="password" placeholder="Password"/>
        
            <button>Submit</button>
        </form>
    )
}

export default UserForm;