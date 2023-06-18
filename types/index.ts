export interface PatientData {
    id: number;
    name: string;
    nin: string;
    gender: 'M'|'F';
    phone_number: string;
    date_of_birth: number;

    prescriptions: any[];
    prescription_count: number;
}

export interface PatientStore {
    id: string|number;
    name: string;
    nin: string;
}

export interface PrescriberStore {
    id: string|number;
    name: string;
    email: string;
    verified: boolean;
}

export interface Prescriber extends PrescriberStore {
    verified: boolean;
    gender: Gender;
    profile_pic: string;
    home_address: string;
    license_expiry: number;
    pharmacy_id: number;

    delegates: any[];
    delegate_count: number;

    is_delegate: boolean;

    issued_prescriptions: any;
    issued_prescriptions_count: number;
}

export interface Drug {
    id: string|number;
    name: string;
    manufacturer:  string;
}

export interface Prescription {
    id: string|number;
    issued_by: number;
    method_of_payment: string;
    date_issued: number;
    drug: Drug[];
    //method
}

export type MutationResult = 'success'|'failure';

export type Gender = 'M'|'F';
