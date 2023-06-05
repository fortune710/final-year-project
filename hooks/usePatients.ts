import { Users } from "@/mock/users";
import { useEffect, useState } from "react";
import { PatientStore, PatientData, MutationResult, Drug } from "@/types";
import useContract from "./useContract";


export default function usePatients() {
    const [patients, setPatients] = useState<PatientStore[]>()
    const [addPatientMutationLoading, setMutationLoading] = useState<boolean>(false);
    const contract = useContract();
    
    const getPatient = async (userId:number) => {
        const data = await contract.patients(userId)
        const patient: Partial<PatientData> = {
            id: data[0],
            name: data[1],
            nin: data[2],
            gender: data[3],
            phone_number: data[4],
            date_of_birth: data[5],
            prescription_count: data[6],
        }
        return patient;
    }

    const getPatientPrescriptions = async (userId:number) => {
        const prescriptionIds = await contract.GetPatientPrescriptions(userId) as any[];
        const data = await Promise.all(prescriptionIds.map(async(id) => await contract.prescriptions(id)))
        const prescriptions = data.map((value) => ({
            issued_by: value[1],
            method_of_payment: value[2],
            date_issued: value[3],
        } as PrescriptionData))
        return prescriptions
    }

    const getAllPatients = async () => {
        let allPatients:PatientStore[] = [];
        const patientCount = await contract.patientCount();

        if (patientCount < 1) return setPatients(allPatients);

        for(let i = 0; i < patientCount; i++) {
            const patient = await contract.patientStore(i);
            allPatients.push({ 
                id: patient[0], 
                name: patient[1],
                nin: patient[2], 
            });
        }

        return setPatients(allPatients);
    }
    
    useEffect(() => {
        getAllPatients()
    }, []);

    function searchUserByNin(query:string) {
        return patients!.filter((user) => user.nin.toLowerCase().includes(query.toLowerCase()))
    }

    async function addPatientToBlockchain(data:Omit<PatientData, "id">): Promise<MutationResult> {
        const { name, nin, gender, phone_number, date_of_birth } = data;
        setMutationLoading(true);

        try {
            const newPatientId = patients!.length + 1;
            const transaction = await contract.AddPatient(newPatientId, name, nin, gender, phone_number, date_of_birth);
            await transaction.wait();
            return "success";

        } catch (e) {
            console.error(e);
            return "failure"
        } finally {
            setMutationLoading(false);
        }
    }

    interface PrescriptionData {
        user_id: number;
        method_of_payment: "cash"|"card";
        issued_by: number;
        date_issued: number;
        prescription_drugs: Drug[]
    }

    async function addPrescription(data: PrescriptionData) {
        const { user_id, method_of_payment, issued_by, prescription_drugs} = data;
        

    }

    return { 
        Users, 
        searchUserByNin, 
        addPatientToBlockchain,
        getPatient,
        getPatientPrescriptions,
        addPatientMutationLoading
    }
}