// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "./PersonHelper.sol";

contract RecruiterFactory is PersonHelper {
    struct Recruiter {
        string name;
        string email;        
        bool exists;
    } // 16 bit + 1 bit = 17 but. = 32 bit

    mapping(address => uint) public recruiterToPerson;
    mapping(address => uint) public addressToRecruiter;
    mapping(uint => address) public recruiterToAddress;
    mapping(address => uint) recruiterToJobCount; // solidly packed
    Recruiter[] public recruiters;
    uint recruiterCount;
}