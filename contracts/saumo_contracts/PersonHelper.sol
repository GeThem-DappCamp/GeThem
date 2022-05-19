// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "./PersonFactory.sol";

contract PersonHelper is PersonFactory {
    function createPerson(
        string memory name,
        string memory email
    ) public returns (uint) {
        persons.push(Person(name, email));
        uint id = persons.length - 1;
        addressToPerson[msg.sender] = id;
        personToAddress[id] = msg.sender;
        personCount++;
        return id;
    }
}