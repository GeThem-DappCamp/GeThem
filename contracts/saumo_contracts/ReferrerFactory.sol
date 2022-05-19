// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "./PersonHelper.sol";

contract ReferrerFactory is PersonHelper {
    struct Referrer {
        bool exists;
        uint reputationScore;
        uint referrerCount;
        string name;
        string email;
    }

    mapping(address => uint) public candidateToPerson;
    mapping(address => uint) public addressToCandidate;
    mapping(uint => address) public candidateToAddress;
    mapping(address => uint) referrerToJobCount;
    mapping(address => uint[]) referrerToJobIds;
    mapping(uint => mapping(uint => uint[])) referrerToJobToCandidates;


    Candidate[] public candidates;
    uint candidateCount;
}