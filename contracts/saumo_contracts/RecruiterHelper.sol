// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "./RecruiterFactory.sol";

contract RecruiterHelper is RecruiterFactory {
    function createRecruiter(
        string memory name,
        string memory email
    ) public {
        uint id = createPerson(name, email);
        recruiters.push(Recruiter(0, true));
        uint recruiterId = recruiters.length - 1;
        addressToRecruiter[msg.sender] = recruiterId;
        recruiterToAddress[recruiterId] = msg.sender;
        recruiterCount++;
        recruiterToPerson[msg.sender] = id;
    }

    function isRecruiter(address _recruiterAdress) public view returns (bool) {
        return recruiters[addressToRecruiter[_recruiterAdress]].exists;
    }
}