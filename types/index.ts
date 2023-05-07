export interface PatientData {
    id: number;
    name: string;
    nin: string;
    gender: 'M'|'F';
    phone_number: string;
    date_of_birth: number;
}

export interface PatientStore {
    id: string|number;
    name: string;
}

export interface PrescriberStore {
    id: string|number;
    name: string;
    email: string;
}

export interface Presciber extends PrescriberStore {
    verified: boolean;
    gender: Gender;
    profile_pic: string;
    home_address: string;
    license_expiry: number;
    delegates: any[];
}

export type MutationResult = 'success'|'failure';

export type Gender = 'M'|'F';
