import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import Contract from "@/hardhat/artifacts/contracts/DrugPrescriptionMonitoringSystem.sol/DrugPrescriptionMonitoringSystem.json";
import { MutationResult, Prescriber, PrescriberStore } from "@/types";
import { useEffect, useState } from "react";
import useContract from "./useContract";

export default function usePrescribers() {
    const queryClient = useQueryClient();
    const contract = useContract();

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

    async function addPrescriberToBlockchain(data:Omit<Prescriber, "id"|"verified"|"delegates"|"issued_prescriptions"|"is_delegate"|"issued_prescriptions_count"|"delegate_count">):Promise<MutationResult> {
        try {
            const { home_address, name, email, profile_pic, gender, license_expiry, pharmacy_id } = data;
            const newPrescriberId = prescribers!.length;
            const transaction = await contract.AddPrescriber(newPrescriberId, name, email, gender, profile_pic, home_address, license_expiry, String(pharmacy_id));
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