// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Recruiter.sol";
import "./Job.sol";

contract GeThem is Job, Recruiter {
    constructor() {}

    function createJobByRecruiter(
        string memory company_name,
        string memory company_logo,
        string memory details,
        string memory salary,
        string memory job_type,
        uint256 initTimestamp,
        uint256 amount
    ) public {
        require(
            Recruiter.isRecruiter(msg.sender),
            "Error sender is not a recruiter"
        );
        uint256 job_id = Job.createJob(
            company_name,
            company_logo,
            details,
            salary,
            job_type,
            initTimestamp,
            amount
        );
        Recruiter.recruiterAddress_openJobsIds[msg.sender].push(job_id);
    }

    function getJobsByRecruiterAddress(address recruiter_address)
        public view
        returns (Job.JobStructure[] memory)
    {
        require(
            Recruiter.isRecruiter(recruiter_address),
            "Error sender is not a recruiter"
        );
        JobStructure[] memory recruiter_jobs = Job.getJobsByAddress(
            recruiter_address
        );

        return recruiter_jobs;
    }
}
