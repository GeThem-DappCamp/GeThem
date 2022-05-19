// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Recruiter.sol";

contract Job is Recruiter {
    address public owner;

    constructor(address aowner) {
        owner = aowner;
    }

    enum HiringStatus {
        WAITING,
        ROUND1,
        ROUND2,
        ACCEPTED,
        REJECTED
    }

    enum JobStatus {
        OPEN,
        CLOSED
    }

    struct JobStructure {
        string company_name;
        string company_logo;
        string details;
        string salary;
        string job_type; //remote or onsite
        uint256 initTimestamp;
        JobStatus status; //closed or open
        Stake stake;
        //how to set an empty mapping while creating a new job?? => Yes OK => NO we should make candidates mapping outside of job struct
        //Does returning an array costs a lot of gas?? or just manipulating it cost gas???
        //1
        mapping(address => HiringStatus) candidates; //candidate ID => candidates_address => hiring_status
        //uint256 candidates_length;
        address[] candidates_addresses;
    }
    //2
    mapping(string => mapping(address => HiringStatus)) jobToCandidateStatus; //=> 1 OR 2

    mapping(uint256 => JobStructure) public jobs;
    uint256 public jobs_length = 0;

    struct Stake {
        address account;
        uint256 amount;
        uint256 initTimestamp;
    }

    function createJob(
        string memory company_name,
        string memory company_logo,
        string memory details,
        string memory salary,
        string memory job_type,
        uint256 initTimestamp,
        uint256 amount
    ) public payable {
        require(
            Recruiter.isRecruiter(msg.sender),
            "Error sender is not a recruiter"
        );
        Stake memory stake = Stake(address(this), amount, block.timestamp);

        jobs[jobs_length] = JobStructure({
            company_name: company_name,
            company_logo: company_logo,
            details: details,
            salary: salary,
            job_type: job_type,
            initTimestamp: initTimestamp,
            status: JobStatus.OPEN,
            stake: stake,
            candidates: 0,
            candidates_length: 0
        });
        jobs_length++;
    }
}
