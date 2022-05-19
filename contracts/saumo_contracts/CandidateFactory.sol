// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "./PersonHelper.sol";

contract CandidateFactory is PersonHelper {
    struct Candidate {
        string name;
        string email;
        bool exists;
        string currentCompany;
    }

    mapping(address => uint) public candidateToPerson;
    mapping(address => uint) public addressToCandidate;
    mapping(uint => address) public candidateToAddress;
    mapping(address => uint) candidateToJobCount;
    mapping(address => uint[]) candidateToJobIds;
    Candidate[] public candidates;
    uint candidateCount;
}