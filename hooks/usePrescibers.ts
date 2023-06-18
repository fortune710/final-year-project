import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import Contract from "@/hardhat/artifacts/contracts/DrugPrescriptionMonitoringSystem.sol/DrugPrescriptionMonitoringSystem.json";
import { MutationResult, Prescriber, PrescriberStore } from "@/types";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/jotai";

export default function usePrescribers() {
    const queryClient = useQueryClient();
    const contract = useContract();
    const currentUser = useAtomValue(currentUserAtom);


    const { 
        isLoading: loadingPrescribers, 
        data: prescribers
    } = useQuery(["prescribers-short"], async () => {
        let allPrescibers:PrescriberStore[] = []
        const prescriberCount = await contract.prescriberCount();
        for (let i = 0; i < prescriberCount; i++) {
            const currentPresciber = await contract.prescriberStore(i)
            allPrescibers?.push({ 
                id: currentPresciber[0],
                name: currentPresciber[1],
                email: currentPresciber[2],
                verified: currentPresciber[3]
            });
        }
    
        return allPrescibers;
    })
    
    async function addPrescriberToBlockchain(data:Omit<Prescriber, "id"|"verified"|"delegates"|"issued_prescriptions"|"is_delegate"|"issued_prescriptions_count"|"delegate_count">):Promise<MutationResult> {
        try {
            const { home_address, name, email, profile_pic, gender, license_expiry, pharmacy_id } = data;
            const newPrescriberId = prescribers!.length;
            const transaction = await contract.AddPrescriber(newPrescriberId, name, email, gender, profile_pic, home_address, license_expiry, String(pharmacy_id));
            await transaction.wait();
            queryClient.invalidateQueries(["prescribers-short"]);
    
            return "success";
        } catch (e) {
            console.error(e);
            return "failure";
        }
    }

    async function addDelegateToBlockchain(data:Omit<Prescriber, "id"|"verified"|"delegates"|"issued_prescriptions"|"is_delegate"|"issued_prescriptions_count"|"delegate_count">):Promise<MutationResult> {
        try {
            const { home_address, name, email, profile_pic, gender, license_expiry, pharmacy_id } = data;
            const prescriber_id = currentUser!.id
            const newPrescriberId = prescribers!.length;
            const transaction = await contract.AddDelegate(prescriber_id, pharmacy_id, newPrescriberId, name, email, gender, profile_pic, home_address, license_expiry);
            await transaction.wait();
            queryClient.invalidateQueries(["prescribers-short"]);
    
            return "success";
        } catch (e) {
            console.error(e);
            return "failure";
        }
    }


    const {
        isLoading:verifiedLoading,
        mutate: verifyPrescriber,
        isSuccess: verifiedSuccess,
    } = useMutation(["verify-prescriber"], async (prescriberId:number) => {
        const transaction = await contract.VerifyPrescriber(prescriberId);
        await transaction.wait();
    })

    return {
        loadingPrescribers,
        prescribers,
        verifiedLoading,
        verifiedSuccess,
        verifyPrescriber,
        addPrescriberToBlockchain,
        addDelegateToBlockchain,
    }
}