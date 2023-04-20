//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DrugPrescriptionMonitoringSystem {

    struct User {
        uint id;
        string name;
        string nin;
        string gender;
    }

    struct Drug {
        uint id;
        string name;
        string manufacturer;
    }

    struct Pharmacy {
        uint id;
        string name;
        string location;
        string[] contact_info;
    }

    struct Prescription {
        uint id;
        string method_of_payment;
        uint256 date_issued;
        Drug drug;
        Pharmacy pharmacy;
    }

    struct Patient {
        uint id;
        string name;
        string nin;
        string gender;
        string phone_number;
        uint256 date_of_birth;
        Prescription[] prescriptions;
        Pharmacy pharmacy;
    }

    struct Delegate {
        uint id;
        string name;
        string email;
        string gender;
        string profile_pic;
        string home_address;
    }

    struct Prescriber {
        uint id;
        string name;
        string email;
        bool verified;
        string gender;
        string profile_pic;
        string home_address;
        uint256 license_expiry;
        Delegate[] delegates;
    }

    mapping (uint => Prescriber) public prescribers;
    uint[] prescriberIds;

    mapping (uint => Patient) public patients;
    uint[] patientIds;

    Drug[] drugs;
    Pharmacy[] pharmacies;

    constructor () {}


    //Events that will be emitted throughout the duration of the contract
    event CreatedPatient(
        string name,
        string nin,
        string gender,
        string phone_number,
        uint date_of_birth
    );

    event CreatedPrescriber(
        string name,
        string email,
        bool verified,
        string gender,
        string profile_pic,
        string home_address,
        uint256 license_expiry
    );

    event CreatedDelegate(
        uint parent_practitoner,
        string name,
        string email,
        string gender,
        string profile_pic,
        string home_address
    );

    event AddedPatientPrescription(
        Patient patient,
        Pharmacy pharmacy,
        Drug drug
    );

    event AddedNewDrug(
        uint id,
        string name,
        string manufacturer
    );

    event AddedNewPharmacy(
        uint id,
        string name,
        string location,
        string[] contact_info
    );

    //Method for Adding new Drug to System
    function AddDrug(uint _id, string memory _name, string memory _manufacturer) public {
        drugs.push(Drug(_id, _name, _manufacturer));
    }

    //Method for Adding new Pharmacy to the System
    function AddPharmacy (uint _id, string memory _name, string memory _location, string[] memory _contact_info) public {
        pharmacies.push(Pharmacy(_id, _name, _location, _contact_info));
    }

    //Patient Creating and Retrieval Methods
    function AddPatient(
        uint id,
        string memory name,
        string memory nin,
        string memory gender,
        string memory phone_number,
        uint date_of_birth
    ) public {

        Patient memory newPatient = patients[id];
        newPatient.id = id;
        newPatient.name = name;
        newPatient.nin = nin;
        newPatient.gender = gender;
        newPatient.phone_number = phone_number;
        newPatient.date_of_birth = date_of_birth;
        
        patientIds.push(id);
        emit CreatedPatient(name, nin, gender, phone_number, date_of_birth);
    }

    function GetPatients() public view returns (Patient[] memory){
        Patient[] memory allPatients = new Patient[](patientIds.length);
        for(uint i = 0; i < patientIds.length; i++) {
            allPatients[i] = patients[i];  
        }
        return allPatients;
    }

    function GetPatientByName(string memory name) public view returns(Patient memory) {

    }

    //Functions for Creating and Getting Prescribers
    function AddPrescriber (
        uint _id,
        string memory _name,
        string memory _email,
        string memory _gender,
        string memory _profile_pic,
        string memory _home_address,
        uint _license_expiry
    ) public {
        Prescriber memory newPrescriber = prescribers[_id];
        newPrescriber.id = _id;
        newPrescriber.email = _email;
        newPrescriber.gender = _gender;
        newPrescriber.profile_pic = _profile_pic;
        newPrescriber.home_address = _home_address;
        newPrescriber.name = _name;
        newPrescriber.verified = false;
        newPrescriber.license_expiry = _license_expiry;

        emit CreatedPrescriber(_name, _email, false, _gender, _profile_pic, _home_address, _license_expiry);
    }

    function VerifyPrescriber (uint id) public {
        prescribers[id].verified = true;
    }

    function AddDelegate(
        uint _prescriber_id,
        uint _id,
        string memory _name,
        string memory _email,
        string memory _gender,
        string memory _profile_pic,
        string memory _home_address
    ) public {
        Delegate memory newDelegate = Delegate(_id, _name, _email, _gender, _profile_pic, _home_address);
        prescribers[_prescriber_id].delegates.push(newDelegate);
    }

    function AddPrescription (
        uint _user_id,

        uint _id, 
        string memory _method_of_payment,
        uint _date_issued,

        uint _drug_id,
        string memory _drug_name,
        string memory _manufacturer,

        uint _pharmacy_id,
        string memory _pharmacy_name,
        string memory _location,
        string[] memory _contact_info
    ) public {
        Pharmacy memory pharmacy = Pharmacy(_pharmacy_id, _pharmacy_name, _location, _contact_info);
        Drug memory drug = Drug(_drug_id, _drug_name, _manufacturer);

        Prescription memory newPrescription = Prescription(_id, _method_of_payment, _date_issued, drug, pharmacy);
        patients[_user_id].prescriptions.push(newPrescription);

        emit AddedPatientPrescription(patients[_user_id], pharmacy, drug);
    }



}