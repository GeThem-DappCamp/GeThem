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
    mapping(uint256 => mapping(uint256 => HiringStatus)) jobId_cadidateId_interviewStatus;
    mapping(uint256 => JobStructure) public jobs;
    uint256 public jobs_length = 0;
    mapping(address => uint256) public recruiterToJobCount;

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
    ) public payable returns (uint256) {
        Stake memory stake = Stake(address(this), amount, block.timestamp);
        uint256[] memory candidateIds = new uint256[](0);

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
        recruiterToJobCount[msg.sender]++;
        jobs_length++;
        return jobs_length - 1;
    }

    function getJobsByAddress(address recruiter_address)
        public
        view
        returns (JobStructure[] memory)
    {
        JobStructure[] memory recruiter_jobs = new JobStructure[](
            recruiterToJobCount[msg.sender]
        );
        uint256 counter = 0;

        for (uint256 i = 0; i < jobs_length; i++) {
            if (jobs[i].recruiter_address == recruiter_address) {
                recruiter_jobs[counter] = jobs[i];
                counter++;
            }
        }
        return recruiter_jobs;
    }
}
