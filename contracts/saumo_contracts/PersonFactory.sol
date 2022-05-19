// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract PersonFactory {
    struct Person {
        string name;
        string email;
    }

    mapping(address => uint) addressToPerson;
    mapping(uint => address) personToAddress;
    Person[] public persons;
    uint personCount;
}