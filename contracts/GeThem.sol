// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Recruiter.sol";
import "./Job.sol";
import "./Referrer.sol";
import "./Candidate.sol";

contract GeThem is Job, Recruiter, Referrer, Candidate {
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
        public
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

    function getTopReferrers() public view returns (ReferrerStruct[] memory) {
        require(
            Recruiter.isRecruiter(recruiter_address),
            "Error sender is not a recruiter"
        );
        //return the entire list of referrers and sort at frontend as sorting consumes gas in solidity
        return Referrer.referrers;
    }

    struct ReferralListStruct {
        string candidate_name;
        string referrer_name;
        string referred_company;
        Job.HiringStatus hiring_status;
    }

    function listOfReferrals()
        public
        view
        returns (ReferralListStruct[] memory)
    {
        ReferralListStruct[] memory referrals = new ReferralListStruct[](0);

        uint256 referrerId = Referrer.referrerAddress_referrerId[msg.sender];
        uint256[] applicationIds = Job.referrerId_applicationIds[referrerId];

        for (uint256 i = 0; i < applicationIds.length; i++) {
            Job.Application application = Job.applications[i];

            referrals.push(
                ReferralListStruct({
                    candidate_name: Candidate
                        .candidates[application.candidateId]
                        .name,
                    referrer_name: Referrer
                        .referrers[application.referrerId]
                        .name,
                    referred_company: Job.jobs[application.jobId].company_name
                })
            );
        }
        return referrals;
    }
}
