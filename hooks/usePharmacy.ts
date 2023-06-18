import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useContract from "./useContract";

interface NewPharmacyData {
    name: string;
    contact_info: string[],
    address: string
}

export default function usePharmacy() {
    const contract = useContract();
    const queryClient = useQueryClient();

    const { isLoading, data: pharmacies } = useQuery({
        queryKey: ["phamacies"],
        queryFn: async () => {
            let pharmacies = [] as any[];
            const pharmacyCount = await contract.pharmacyCount();
            for (let i = 0; i < pharmacyCount; i++) {
                const pharmacy = await contract.pharmacies(i);
                pharmacies = [...pharmacies, pharmacy];
            }
            return pharmacies;
        }
    })


    const { 
        isLoading: addPharmacyLoading,
        mutate: addPharmacy,
        isSuccess: addPharmacySuccess,
        isError: addPharmacyError
    } = useMutation({
        mutationKey: ["add-pharmacy"],
        mutationFn: async (data: NewPharmacyData) => {
            const { name, contact_info, address } = data;
            const transaction = await contract.AddPharmacy(name, address, contact_info);
            await transaction.wait();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["pharmacies"])
        }
    })

    return {
       isLoading, 
       pharmacies,
       addPharmacy,
       addPharmacyLoading,
       addPharmacySuccess,
       addPharmacyError
    }
}