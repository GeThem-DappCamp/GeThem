// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Recruiter.sol";
import "./Job.sol";
import "./Referrer.sol";
import "./Candidate.sol";

contract GeThem is Job, Recruiter, Referrer, Candidate {
    constructor() {}

    ////////////////////////////////////Recruiter functions//////////////////////////////////////////////////////
    modifier onlyRecruiter() {
        require(
            Recruiter.isRecruiter(msg.sender),
            "Error sender is not a recruiter"
        );
        _;
    }

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
        JobStructure[] memory recruiter_jobs = Job.getJobsByAddress(
            recruiter_address
        );

        return recruiter_jobs;
    }

    function allReferrers()
        public
        view
        onlyRecruiter
        returns (ReferrerStruct[] memory)
    {
        //this func will return all referrers sorting if needed will be done at frontend

        //Note: referrerIds starts with 1
        ReferrerStruct[] memory topReferrers = new ReferrerStruct[](
            referrerCount
        );

        for (uint256 i = 1; i <= referrerCount; i++) {
            topReferrers[i - 1] = referrers[i];
        }
        return topReferrers;
    }

    ////////////////////////////////////Referrer functions//////////////////////////////////////////////////////
    modifier onlyReferrer() {
        require(
            Referrer.isReferrer(msg.sender),
            "Error sender is not a referrer"
        );
        _;
    }

    function createReferrerAccount(
        string memory _name,
        string memory _email,
        string memory _community_names
    ) public {
        Referrer.createReferrer(_name, _email, _community_names);
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
        onlyReferrer
        returns (ReferralListStruct[] memory)
    {
        uint256 referrerId = address_referrerId[msg.sender];
        uint256[] memory applicationIds = Job.referrerId_applicationIds[
            referrerId
        ];

        ReferralListStruct[] memory referrals = new ReferralListStruct[](
            applicationIds.length
        );

        for (uint256 i = 0; i < applicationIds.length; i++) {
            Job.Application memory application = Job.applications[i];

            referrals[i] = ReferralListStruct({
                candidate_name: candidates[application.candidateId].name,
                referrer_name: referrers[application.referrerId].name,
                referred_company: Job.jobs[application.jobId].company_name,
                hiring_status: application.hiringStatus
            });
        }
        return referrals;
    }

    function referCandidate(
        string memory candidateName,
        string memory candidateEmail,
        string memory candidateCompany,
        address candidateAddress,
        uint256 job_id
    ) public onlyReferrer {
        if (isCandidate(candidateAddress) == false) {
            createCandidateAccount(
                candidateName,
                candidateEmail,
                candidateCompany,
                candidateAddress
            );
        }

        uint256 candidate_id = address_candidateId[candidateAddress];
        uint256 referrer_id = address_referrerId[msg.sender];

        Application memory newApplication = Application({
            candidateId: candidate_id,
            referrerId: referrer_id,
            jobId: job_id,
            hiringStatus: HiringStatus.WAITING,
            skillsets: ""
        });

        Job.applications.push(newApplication);
        uint256 applicationId = Job.applications.length;

        candidateId_applicationIds[candidate_id].push(applicationId);
        referrerId_applicationIds[referrer_id].push(applicationId);
    }

    function getApplications() public view returns (Application[] memory) {
        return Job.applications;
    }

    ////////////////////////////////////Candidate functions//////////////////////////////////////////////////////
    modifier onlyCandidate() {
        require(isCandidate(msg.sender), "Error sender is not a candidate");
        _;
    }

    function createCandidateAccount(
        string memory _name,
        string memory _email,
        string memory _company,
        address _candidateAddress
    ) public {
        //using _candidateAddress instead of msg.sender because the same function will be called by referrer
        createCandidate(_name, _email, _company, _candidateAddress);
    }

    function getOpenJobs() public view returns (JobStructure[] memory) {
        return Job.getAllOpenJobs();
    }

    //updateSkillSets() for a particular application
    //listOfApplications() for a candidate - similar to listOfReferrals() above
}
