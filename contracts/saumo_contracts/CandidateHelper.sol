// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "./CandidateFactory.sol";

contract CandidateHelper is CandidateFactory {
    function createCandidate(
        string memory name,
        string memory email,
        string memory company
    ) public {
        uint id = createPerson(name, email);
        candidates.push(Candidate(0, true, company));
        uint candidateId = candidates.length - 1;
        addressToCandidate[msg.sender] = candidateId;
        candidateToAddress[candidateId] = msg.sender;
        candidateCount++;
        candidateToPerson[msg.sender] = id;
    }

    function isCandidate(address _candidateAddress) public view returns (bool) {
        return candidates[addressToCandidate[_candidateAddress]].exists;
    }
}