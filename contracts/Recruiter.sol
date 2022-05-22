// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Recruiter {
    address public account;

    struct RecruiterStruct {
        string name;
        string email;
        bool exist;
    }
    mapping(uint256 => RecruiterStruct) public recruiters;
    mapping(address => uint256) public address_recruiterId;
    uint256 public recruiterCount;
    mapping(address => uint256[]) public recruiterAddress_openJobsIds;

    function createRecruiterAccount(
        address recruiter_address,
        string memory name,
        string memory email
    ) public {
        recruiterCount++;
        RecruiterStruct memory recruiter = RecruiterStruct(name, email, true);
        recruiters[recruiterCount] = recruiter;
        address_recruiterId[recruiter_address] = recruiterCount;
    }

    function isRecruiter(address recruiter_address) public view returns (bool) {
        uint256 recruiterId = address_recruiterId[recruiter_address];
        if (recruiterId != 0 && recruiters[recruiterId].exist) {
            return true;
        }
        return false;
    }
}
