import { Users } from "@/mock/users";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Contract from "@/hardhat/artifacts/contracts/DrugPrescriptionMonitoringSystem.sol/DrugPrescriptionMonitoringSystem.json";
import { PatientStore, PatientData, MutationResult } from "@/types";

const ADDRESS_FROM_REMIX = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const oldaddress = "0x81Cb982DFAf5E62145C385E326000549AB05614A"
const contractAddress = process.env.CONTRACT_ADDRESS!;
const provider = new ethers.EtherscanProvider("sepolia", "HXHC8CZC3NV6TIXW6FTJD9MRFSSPZ7DT43");
const wallet = new ethers.Wallet("8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e", provider)

const contract = new ethers.Contract("0x646D0a49C30F6051AD45d5fCD3D18abECe17128a", Contract.abi, wallet);






export default function usePatients() {
    const [patients, setPatients] = useState<PatientStore[]>()
    const [addPatientMutationLoading, setMutationLoading] = useState<boolean>(false);

    const getPatient = async (userId:number) => {
        const patient = await contract.patients(userId)
        return patient;
    }

    const getAllPatients = async () => {
        let allPatients:PatientStore[] = [];
        const patientCount = await contract.patientCount();

        for(let i = 0; i < patientCount; i++) {
            const patient = await contract.patientStore(i);
            allPatients.push({ id: patient[0], name: patient[1] });
        }

        console.log(allPatients);
        return setPatients(allPatients);
    }
    useEffect(() => {
        getAllPatients()
    }, []);

    function searchUser(query:string) {
        return patients!.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
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

    return { 
        Users, 
        searchUser, 
        addPatientToBlockchain,
        getPatient,
        addPatientMutationLoading
    }
}