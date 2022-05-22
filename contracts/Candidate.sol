// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// import "hardhat/console.sol";

contract Candidate {
    struct CandidateStruct {
        string name;
        string email;
        string currentCompany;
        bool exist;
    }

    mapping(uint256 => CandidateStruct) public candidates;
    mapping(address => uint256) public address_candidateId;
    uint256 public candidateCount;

    function createCandidate(
        string memory name,
        string memory email,
        string memory company,
        address candidateAddress
    ) internal {
        // candidates.push(CandidateStruct(name, email, company, true));
        // uint256 candidateId = candidates.length - 1;
        // addressToCandidate[candidateAddress] = candidateId;
        // candidateToAddress[candidateId] = candidateAddress;

        candidateCount++;
        CandidateStruct memory candidate = CandidateStruct(
            name,
            email,
            company,
            true
        );
        candidates[candidateCount] = candidate;
        address_candidateId[candidateAddress] = candidateCount;
    }

    function isCandidate(address _candidateAddress)
        internal
        view
        returns (bool)
    {
        uint256 candidateId = address_candidateId[_candidateAddress];
        if (candidateId != 0 && candidates[candidateId].exist) {
            return true;
        }
        return false;
    }
}
