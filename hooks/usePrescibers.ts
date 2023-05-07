import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import Contract from "@/hardhat/artifacts/contracts/DrugPrescriptionMonitoringSystem.sol/DrugPrescriptionMonitoringSystem.json";
import { MutationResult, Presciber, PrescriberStore } from "@/types";
import { useEffect, useState } from "react";
const provider = new ethers.EtherscanProvider("sepolia", "HXHC8CZC3NV6TIXW6FTJD9MRFSSPZ7DT43");
const wallet = new ethers.Wallet("8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e", provider)

const contract = new ethers.Contract("0x646D0a49C30F6051AD45d5fCD3D18abECe17128a", Contract.abi, wallet);

export default function usePrescribers() {
    const queryClient = useQueryClient();

    const [prescribers, setPrescribers] = useState<PrescriberStore[]>();

    async function getPrescribers() {
        let allPrescibers:PrescriberStore[] = []
        const prescriberCount = await contract.prescriberCount();
        for (let i = 0; i < prescriberCount; i++) {
            const currentPresciber = await contract.prescriberStore(i)
            allPrescibers.push({ 
                id: currentPresciber[0],
                name: currentPresciber[1],
                email: currentPresciber[2],
            });
        }
    
        return setPrescribers(allPrescibers);
    }

    useEffect(() => {
        getPrescribers();
    }, [])
    
    /*
    const { isLoading, data: prescribers, error } = useQuery(["prescribers"], async () => {
    })*/

    async function addPrescriberToBlockchain(data:Omit<Presciber, "id"|"verified"|"delegates">):Promise<MutationResult> {
        try {
            const { home_address, name, email, profile_pic, gender, license_expiry } = data;
            const newPrescriberId = prescribers!.length;
    
            const transaction = await contract.AddPrescriber(newPrescriberId, name, email, gender, profile_pic, home_address, license_expiry);
            await transaction.wait();
            //queryClient.invalidateQueries(["prescribers"]);
    
            return "success";
        } catch (e) {
            console.error(e);
            return "failure";
        }
    }

    async function verifyPresciber(prescriberId:number): Promise<MutationResult> {
        try {
            const transaction = await contract.VerifyPrescriber(prescriberId);
            await transaction.wait();
            return "success";
        } catch (e) {
            console.error(e);
            return "failure";
        }
    }

    return {
        prescribers,
        addPrescriberToBlockchain,
    }
}