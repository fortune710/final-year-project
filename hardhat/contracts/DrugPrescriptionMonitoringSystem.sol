//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract DrugPrescriptionMonitoringSystem {

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
        uint[] drug_ids;
    }

    struct Patient {
        uint id;
        string name;
        string nin;
        string gender;
        string phone_number;
        uint256 date_of_birth;
        uint[] prescriptions; //will hold id's of prescriptions
        uint256 prescription_count;
    }

    struct PatientStorage {
        uint id;
        string name;
        string nin;
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
        uint license_expiry;
        uint pharmacy_id;

        uint[] delegates;
        uint delegates_count;

        bool is_delegate;

        uint[] issued_prescriptions; //will hold id's of prescriptions
        uint256 issued_prescriptions_count;
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

    mapping (uint => Prescription) public prescriptions;
    uint public prescription_count = 0;

    mapping (uint => Drug) public drugs;
    uint public drug_count = 0;

    mapping (uint => Pharmacy) public pharmacies;
    uint public pharmacy_count = 0;

    constructor () {}

    //Helper Functions
    function compareStrings(string memory str1, string memory str2) private pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function generateRandomId() public view returns (uint256) {
        uint256 randomId = uint256(keccak256(abi.encodePacked(block.timestamp, address(this))));
        return randomId;
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
        PatientStorage patient,
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
    function AddDrug(string memory _name, string memory _manufacturer) public {
        Drug storage newDrug = drugs[drug_count];
        newDrug.id = drug_count;
        newDrug.manufacturer = _name;
        newDrug.manufacturer = _manufacturer;
        drug_count++;
    }

    //Method for Adding new Pharmacy and updating existing pharmacy to the System
    function AddPharmacy (string memory _name, string memory _location, string[] memory _contact_info) public {
        Pharmacy storage newPharmacy = pharmacies[pharmacy_count];
        newPharmacy.id = pharmacy_count;
        newPharmacy.name = _name;
        newPharmacy.location = _location;
        newPharmacy.contact_info = _contact_info;
        pharmacy_count++;
    }

    function UpdatePharmacyLocation (uint pharmacy_id, string memory new_location) public {
        pharmacies[pharmacy_id].location = new_location;
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
        newPatient.prescription_count = 0;   
        
        patientStore.push(PatientStorage(id, name, nin));
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
        uint _license_expiry,

        uint _pharmacy_id
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
        newPrescriber.pharmacy_id = _pharmacy_id;
        newPrescriber.issued_prescriptions_count = 0;

        newPrescriber.is_delegate = false;
        newPrescriber.delegates_count = 0;

        prescriberCount++;
        prescriberStore.push(PrescriberStorage(_id, _name, _email, false));
        emit CreatedPrescriber(_name, _email, false, _gender, _profile_pic, _home_address, _license_expiry);
    }


    function VerifyPrescriber (uint id) public {
        prescribers[id].verified = true;
        prescriberStore[id].verified = true;
    }

    /*
    function GetUnverifiedPrescribers () public view {
        uint unverified_prescriber_count = 0;
        Prescriber[] storage unverifiedPrescribers;

        for(uint i = 0; i < prescriberCount; i++) {
            if(prescribers[i].verified == true) {
                //unverifiedPrescribers.push(prescribers[i]);
            }
        }
    }*/

    function GetPrescriberByEmail(string memory email) public view returns(Prescriber memory) {
        Prescriber memory currentPresciber;

        for(uint i = 0; i < prescriberCount; i++) {
            string memory currEmail = prescribers[i].email;
            if(compareStrings(currEmail, email)) {
                currentPresciber = prescribers[i];
            }
        }
        return currentPresciber;
    }


    //Functions to Manage Delegates of Prescribers
    function AddDelegate(
        uint _prescriber_id,
        uint _pharmacy_id,

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
        
        Prescriber storage newDelegate = prescribers[_id];
        newDelegate.id = _id;
        newDelegate.email = _email;
        newDelegate.gender = _gender;
        newDelegate.profile_pic = _profile_pic;
        newDelegate.home_address = _home_address;
        newDelegate.name = _name;
        newDelegate.verified = false;
        newDelegate.is_delegate = true;
        newDelegate.license_expiry = _license_expiry;
        newDelegate.pharmacy_id = _pharmacy_id;
        newDelegate.issued_prescriptions_count = 0;

        prescriberCount++;
        prescriberStore.push(PrescriberStorage(_id, _name, _email, false));
        emit CreatedPrescriber(_name, _email, false, _gender, _profile_pic, _home_address, _license_expiry);
        prescribers[_prescriber_id].delegates.push(_id);
    }


    function RemoveDelegate(
        uint _prescriber_id,
        uint _delegate_index_in_array
    ) public {
        //Some Code
        
        uint[] storage delegates = prescribers[_prescriber_id].delegates;
        delegates[_delegate_index_in_array] = delegates[delegates.length -1];
        delegates.pop();
        
    }


    //Functions to Add Prescription
   function AddPrescription(
        uint _user_id,
        string memory _method_of_payment,
        uint _date_issued,
        uint _issued_by,
        uint[] memory prescription_drugs

    ) public {
        uint prescription_id = patients[_user_id].prescriptions.length;
        Prescription storage newPrescription = prescriptions[prescription_id];

        newPrescription.id = prescription_id;
        newPrescription.date_issued = _date_issued;
        newPrescription.method_of_payment = _method_of_payment;
        newPrescription.issued_by = _issued_by;
        
        for(uint i = 0; i < prescription_drugs.length; i++) {
            newPrescription.drug_ids.push(prescription_drugs[i]);
        }
    
        prescribers[_issued_by].issued_prescriptions.push(prescription_id);
        prescribers[_issued_by].issued_prescriptions_count++;

        patients[_user_id].prescriptions.push(prescription_id);
        patients[_user_id].prescription_count++;

    }

    function GetPatientPrescriptions(uint patient_id) public view returns (uint[] memory){
        return patients[patient_id].prescriptions;
    }

    function GetPrescriberPrescriptions(uint prescriber_id) public view returns (uint[] memory) {
        return prescribers[prescriber_id].issued_prescriptions;
    }

    function GetPrescriberDelegates(uint prescriber_id) public view returns (uint[] memory) {
        return prescribers[prescriber_id].delegates;
    }


}