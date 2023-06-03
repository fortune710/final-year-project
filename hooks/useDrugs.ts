import { Drugs } from "@/mock/presciption";
import { Drug } from "@/types";
import { useEffect, useState } from "react";

export default function useDrugs() {
    const [drugs, setDrugs] = useState<Drug[]>([])
    
    useEffect(() => {
        setDrugs(Drugs)
    }, [])

    function searchDrug(query:string) {
        return drugs!.filter((drug) => drug.name.toLowerCase().includes(query.toLowerCase()))
    }

    return {
        drugs,
        searchDrug,

    }

}