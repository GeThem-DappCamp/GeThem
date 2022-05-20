// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Recruiter.sol";
import "./Job.sol";
import "./Referrer.sol";
import "./Candidate.sol";

contract GeThem is Job, Recruiter, Referrer, Candidate {
    constructor() {}

    modifier onlyRecruiter() {
        require(
            Recruiter.isRecruiter(msg.sender),
            "Error sender is not a recruiter"
        );
        _;
    }

    modifier onlyReferrer() {
        require(
            Referrer.isReferrer(msg.sender),
            "Error sender is not a recruiter"
        );
        _;
    }

    ////////////////////////////////////Recruiter functions//////////////////////////////////////////////////////
    function createJobByRecruiter(
        string memory company_name,
        string memory company_logo,
        string memory details,
        string memory salary,
        string memory job_type,
        uint256 initTimestamp,
        uint256 amount
    ) public onlyRecruiter {
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
        public
        view
        onlyRecruiter
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

    function getTopReferrers()
        public
        view
        onlyRecruiter
        returns (ReferrerStruct[] memory)
    {
        return Referrer.referrers;
    }

    ////////////////////////////////////Referrer functions//////////////////////////////////////////////////////
    struct ReferralListStruct {
        string candidate_name;
        string referrer_name;
        string referred_company;
        Job.HiringStatus hiring_status;
    }

    function listOfReferrals()
        public
        view
        onlyReferrer
        returns (ReferralListStruct[] memory)
    {
        uint256 referrerId = Referrer.referrerAddress_referrerId[msg.sender];
        uint256[] memory applicationIds = Job.referrerId_applicationIds[
            referrerId
        ];

        ReferralListStruct[] memory referrals = new ReferralListStruct[](
            applicationIds.length
        );

        for (uint256 i = 0; i < applicationIds.length; i++) {
            Job.Application memory application = Job.applications[i];

            referrals[i] = ReferralListStruct({
                candidate_name: Candidate
                    .candidates[application.candidateId]
                    .name,
                referrer_name: Referrer.referrers[application.referrerId].name,
                referred_company: Job.jobs[application.jobId].company_name,
                hiring_status: application.hiringStatus
            });
        }
        return referrals;
    }

    function getOpenJobs() public view returns (JobStructure[] memory) {
        return Job.getAllOpenJobs();
    }
}
