import { Prescriber } from "@/types";
import { atom } from "jotai"

export const currentUserAtom = atom<Prescriber>({
    id: 0,
    name: "",
    email: "",
    gender: "M",
    verified: false,
    profile_pic: "",
    home_address: "",
    license_expiry: 0,
    pharmacy_id: 0,
    delegates: [],
    issued_prescriptions: [],
    
    is_delegate: false,
    delegate_count: 0,
    issued_prescriptions_count: 0,
})