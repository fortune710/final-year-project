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
        uint issued_by;
        string method_of_payment;
        uint256 date_issued;
        Drug drug;
    }

    struct Patient {
        uint id;
        string name;
        string nin;
        string gender;
        string phone_number;
        uint256 date_of_birth;
        Prescription[] prescriptions;
    }

    struct PatientStorage {
        uint id;
        string name;
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

    struct PrescriberStorage {
        uint id;
        string name;
        string email;
        bool verified;
    }

    mapping (uint => Prescriber) public prescribers;
    PrescriberStorage[] public prescriberStore;
    uint public prescriberCount = 0;

    mapping (uint => Patient) public patients;
    /*
        patientStore is a minute version of the patients mapping
        This is what would be trasnferred to the frontend fro searching patients
        Array that returns just the patient's id and name
    */
    PatientStorage[] public patientStore;
    uint public patientCount = 0;

    Drug[] public drugs;
    Pharmacy[] public pharmacies;

    constructor () {}

    //Helper Functions
    function compareStrings(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }



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

        Patient storage newPatient = patients[id];
        newPatient.id = id;
        newPatient.name = name;
        newPatient.nin = nin;
        newPatient.gender = gender;
        newPatient.phone_number = phone_number;
        newPatient.date_of_birth = date_of_birth;

    
        
        patientStore.push(PatientStorage(id, name));
        patientCount++;
        emit CreatedPatient(name, nin, gender, phone_number, date_of_birth);
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

        for(uint i = 0; i < prescriberCount; i++) {
            string memory currEmail = prescriberStore[i].email;
            if(compareStrings(currEmail, _email)) {
                require(compareStrings(currEmail, _email) == true, "Email already in use");
                break;
            }
        }

        Prescriber storage newPrescriber = prescribers[_id];
        newPrescriber.id = _id;
        newPrescriber.email = _email;
        newPrescriber.gender = _gender;
        newPrescriber.profile_pic = _profile_pic;
        newPrescriber.home_address = _home_address;
        newPrescriber.name = _name;
        newPrescriber.verified = false;
        newPrescriber.license_expiry = _license_expiry;

        prescriberCount++;
        prescriberStore.push(PrescriberStorage(_id, _name, _email, false));
        emit CreatedPrescriber(_name, _email, false, _gender, _profile_pic, _home_address, _license_expiry);
    }

    function VerifyPrescriber (uint id) public {
        prescribers[id].verified = true;
        prescriberStore[id].verified = true;
    }


    //Functions to Manage Delegates of Prescribers
    function AddDelegate(
        uint _prescriber_id,
        uint _id,
        string memory _name,
        string memory _email,
        string memory _gender,
        string memory _profile_pic,
        string memory _home_address
    ) public {
        prescribers[_prescriber_id].delegates.push(Delegate(_id, _name, _email, _gender, _profile_pic, _home_address));
    }

    function RemoveDelegate(
        uint _prescriber_id,
        uint _delegate_index_in_array
    ) public returns(Delegate[] memory) {
        //Some Code
        Delegate[] storage delegates = prescribers[_prescriber_id].delegates;
        delegates[_delegate_index_in_array] = delegates[delegates.length -1];
        delegates.pop();
        return delegates;
    }


    //Functions to Add Prescription
    function AddPrescription (
        uint _user_id,

        uint _id, 
        string memory _method_of_payment,
        uint _date_issued,
        uint _issued_by,

        uint _drug_id,
        string memory _drug_name,
        string memory _manufacturer

    ) public {

        patients[_user_id].prescriptions.push(Prescription(_id, _issued_by, _method_of_payment, _date_issued, Drug(_drug_id, _drug_name, _manufacturer)));
        /*
        patients[_user_id].prescriptions.push(newPrescription);*/

        //emit AddedPatientPrescription(patients[_user_id], pharmacy, drug);
    }



}