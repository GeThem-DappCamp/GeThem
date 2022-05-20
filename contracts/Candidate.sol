// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract Candidate {
    struct CandidateStruct {
        string name;
        string email;
        string currentCompany;
        bool exists;
    }

    mapping(address => uint256) public addressToCandidate;
    mapping(uint256 => address) public candidateToAddress;
    mapping(address => uint256) candidateToJobCount;
    mapping(address => uint256[]) candidateToJobIds;
    CandidateStruct[] public candidates;

    // uint256 candidateCount;

    function createCandidate(
        string memory name,
        string memory email,
        string memory company
    ) public {
        candidates.push(CandidateStruct(name, email, company, true));
        uint256 candidateId = candidates.length - 1;
        addressToCandidate[msg.sender] = candidateId;
        // candidateCount++;
        candidateToAddress[candidateId] = msg.sender;
    }

    function isCandidate(address _candidateAddress) public view returns (bool) {
        return candidates[addressToCandidate[_candidateAddress]].exists;
    }
}
