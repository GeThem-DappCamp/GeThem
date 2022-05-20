// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Recruiter {
    address public account;

    struct RecruiterStruct {
        string name;
        string email;
        bool exist;
    }
    mapping(address => RecruiterStruct) public recruiters;
    mapping(address => uint256[]) public recruiterAddress_openJobsIds;


    function createRecruiterAccount(
        address recruiter_address,
        string memory name,
        string memory email
    ) public {
        RecruiterStruct memory recruiter = RecruiterStruct(name, email, true);
        recruiters[recruiter_address] = recruiter;
    }

    function isRecruiter(address recruiter_address) public view returns (bool) {
        if (recruiters[recruiter_address].exist) {
            return true;
        }
        return false;
    }
}
