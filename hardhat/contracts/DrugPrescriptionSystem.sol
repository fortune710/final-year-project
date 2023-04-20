// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DrugPrescriptionSystem {

    struct User {
        uint id;
        string name;
        string email;
        string password;

    }

    struct HeathPractioner {
        User base;
        bool verified;
    }

    struct Patient {
        string id;
        string name;
        string phoneNumber;
        string nin;
        string gender;
        uint256 dateOfBirth;
    }

    uint public nonce;
    
    function generateID() public returns (uint) {
        nonce++;
        uint id = uint(keccak256(abi.encodePacked(nonce, block.timestamp, block.prevrandao))) % 1000000;
        return id;
    }


    mapping (uint => User) public users;


    function AddUser(
        uint key,
        string memory email,
        string memory password,
        string memory name
    ) public {
        //uint id = generateID();
        User storage newUser = users[key];

        newUser.id = key;
        newUser.email = email;
        newUser.password = password;
        newUser.name = name;
    }

    function updatePassword (
        uint user_id,
        string memory newPassword
    ) public {
        users[user_id].password = newPassword;
    }


    
    constructor() {
        nonce = 0;
    }

}
