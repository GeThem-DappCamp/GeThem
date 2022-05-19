// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract JobFactory {
    mapping(uint => address) jobToRecruiter;
    mapping(uint => address[]) jobToCandidates;
    uint jobCount;

     enum JobStatus {
        OPEN,
        CLOSED
    }

    enum HiringStatus {
        WAITING,
        ROUND1,
        ROUND2,
        ACCEPTED,
        REJECTED
    }

    struct Job {
        string company_name;
        string company_logo;
        string details;
        string salary;
        string job_type;
        uint initTimestamp;
        JobStatus status;
        Stake stake;
    }

    mapping(uint256 => mapping(uint256 => HiringStatus)) public jobToCandidateToHiringStatus;
    mapping(uint256 => mapping(uint256 => HiringStatus)) public candidateToJobToHiringStatus;

     struct Stake {
        address account;
        uint amount;
        uint initTimestamp;
    }

    Job[] public jobs;
}