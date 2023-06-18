import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import Contract from "@/hardhat/artifacts/contracts/DrugPrescriptionMonitoringSystem.sol/DrugPrescriptionMonitoringSystem.json";
import { MutationResult, Prescriber, PrescriberStore } from "@/types";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/jotai";
import usePrescribers from "./usePrescibers";

export default function useDelegates() {
    const queryClient = useQueryClient();
    const contract = useContract();
    const currentUser = useAtomValue(currentUserAtom);
    const { addDelegateToBlockchain } = usePrescribers();


    const { 
        isLoading: loadingDelegates, 
        data: delegates
    } = useQuery(["delegates"], async () => {
        const delegate_ids: number[] = Array.from(await contract.GetPrescriberDelegates(currentUser!.id));
        const promises = delegate_ids.map(async (id) => await contract.prescribers(id));
        const delegates = await Promise.all(promises);
        console.log(delegates)
        return delegates as Prescriber[];
    })

    

    const { 
        isLoading: addDelagatesLoading,
        mutate: addDelegate,
        isSuccess: addDelegateSuccess,
        isError: addDelegateError,
    } = useMutation(["add-delegate"], async (data:Omit<Prescriber, "id"|"verified"|"delegates"|"issued_prescriptions"|"is_delegate"|"issued_prescriptions_count"|"delegate_count">) => {
        return await addDelegateToBlockchain(data)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["delegates"])      
        }
    })
    
    return {
        loadingDelegates,
        delegates,
        addDelagatesLoading,
        addDelegate,
        addDelegateSuccess,
        addDelegateError
    }
}