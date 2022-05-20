// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Job {
    address public owner;

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

    struct Stake {
        address account;
        uint256 amount;
        uint256 initTimestamp;
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
        uint256[] candidatesIds;
        address recruiter_address;
    }

    struct Application {
        uint256 candidateId;
        uint256 referrerId;
        uint256 recruiterId;
        uint256 jobId;
        HiringStatus hiringStatus;
    }
    Application[] applications;
    mapping(uint256 => uint256[]) candidateId_applicationIds;
    mapping(uint256 => uint256[]) referrerId_applicationIds;
    // mapping(uint256 => mapping(uint256 => HiringStatus)) cadidateId_jobId_hiringStatus;

    //ask: why do we need below mapping if we can directly access array based on ID?
    mapping(uint256 => JobStructure) public jobs;
    uint256 public jobs_length = 0;
    JobStructure[] recruiter_jobs;

    function createJob(
        string memory company_name,
        string memory company_logo,
        string memory details,
        string memory salary,
        string memory job_type,
        uint256 initTimestamp,
        uint256 amount
    ) public payable returns (uint256) {
        //todo: this should be an internal payable function, but should all payable functions be public?

        Stake memory stake = Stake(address(this), amount, block.timestamp);
        uint256[] memory candidateIds = new uint256[](0);

        //ask: instead of adding to map, add to array
        jobs[jobs_length] = JobStructure({
            company_name: company_name,
            company_logo: company_logo,
            details: details,
            salary: salary,
            job_type: job_type,
            initTimestamp: initTimestamp,
            status: JobStatus.OPEN,
            stake: stake,
            candidatesIds: candidateIds,
            recruiter_address: msg.sender
        });
        jobs_length++;
        return jobs_length - 1;
    }

    function getJobsByAddress(address recruiter_address)
        public
        returns (JobStructure[] memory)
    {
        //todo: does running a loop cost gas? read articles on gas optimisation techniques
        //ask: we can maintain a mapping(recruiter_address to jobIds), based on IDs form an array and return it
        for (uint256 i = 0; i < jobs_length; i++) {
            if (jobs[i].recruiter_address == recruiter_address) {
                JobStructure memory job = jobs[i];
                recruiter_jobs.push(job);
            }
        }
        return recruiter_jobs;
    }
}
