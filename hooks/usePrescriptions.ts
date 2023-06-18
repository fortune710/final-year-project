import { Drug, Prescription } from "@/types";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import useDrugs from "./useDrugs";

export default function usePrescriptions() {
    const contract = useContract();
    const { drugs } = useDrugs();

    const getPrescription = async (presciptionId:number) => {
        const data = await contract.prescriptions(presciptionId);
        return data;
    }   

    const getPrescriptionDrugs = async (presciptionId:number) => {
        const data = await contract.GetPrescriptionDrugs(presciptionId);
        return data;
    }   


    const getPrescriberPrescriptions = async (prescriberId: number) => {
        const prescription_ids: number[] = Array.from(await contract.GetPrescriberPrescriptions(prescriberId));
        let prescriptions = [] as Prescription[];
        for(let id of prescription_ids) {
            const [data, drug_ids] = await Promise.all([
                await getPrescription(id),
                Array.from(await getPrescriptionDrugs(id))
            ])
            const prescription_drugs = drugs.filter((drug) => drug_ids.includes(Number(drug.id)))
            prescriptions.push({
                id: data[0],
                issued_by: data[1],
                method_of_payment: data[2],
                date_issued: data[3],
                drug: prescription_drugs
            })
            console.log(prescription_drugs);
        }
        return prescriptions;
    }

    const getPatientPrescriptions = async (prescriberId: number) => {
        const prescription_ids = await contract.GetPatientPrescriptions(prescriberId);
        let prescriptions = [] as Prescription[];
        
        for(let id = 0; id < prescription_ids.length; id++){
            const data = await getPrescription(id);
            const drug_ids = data[5] as any[];
            const prescription_drugs = drugs.filter((drug) => drug_ids.includes(drug.id))
            prescriptions.push({
                id: data[1],
                issued_by: data[2],
                method_of_payment: data[3],
                date_issued: data[4],
                drug: prescription_drugs
            })
        }

        return prescriptions;
    }

    return {
        getPatientPrescriptions,
        getPrescriberPrescriptions
    }


}