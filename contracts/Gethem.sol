// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Recruiter.sol";
import "./Job.sol";
import "./Referrer.sol";
import "./Candidate.sol";

contract GeThem is Job, Recruiter, Referrer, Candidate {
    constructor() {}

    ////////////////////////////////////Recruiter functions//////////////////////////////////////////////////////
    function createJobByRecruiter(
        string memory company_name,
        string memory company_logo,
        string memory details,
        string memory salary,
        string memory job_type,
        uint256 amount
    ) public payable onlyRecruiter {
        require(msg.value == amount);
        uint256 job_id = Job.createJob(
            company_name,
            company_logo,
            details,
            salary,
            job_type,
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

    function closeJob(uint256 _jobId) public onlyRecruiter {
        require(jobs[_jobId].recruiter_address == msg.sender);
        jobs[_jobId].status = JobStatus.CLOSED;
        if (jobs[_jobId].stake.account == address(this)) {
            payable(msg.sender).transfer(jobs[_jobId].stake.amount);
            jobs[_jobId].stake.account = msg.sender;
        }
    }

    function changeCandidateState(
        uint8 _state,
        uint256 _appId,
        uint256 _jobId
    ) public onlyRecruiter {
        require(jobs[_jobId].recruiter_address == msg.sender);
        if (
            _state > uint256(applications[_appId].hiringStatus) &&
            applications[_appId].referrerId != 0
        ) {
            referrers[applications[_appId].referrerId].reputation_score++;
        }
        if (_state == uint256(HiringStatus.ACCEPTED)) {
            if (
                jobs[_jobId].stake.account == address(this) &&
                applications[_appId].referrerId != 0
            ) {
                payable(referrerId_address[applications[_appId].referrerId])
                    .transfer(jobs[_jobId].stake.amount);
                jobs[_jobId].stake.account = referrerId_address[
                    applications[_appId].referrerId
                ];
            }
            closeJob(_jobId);
        }
        applications[_appId].hiringStatus = getHiringStateByUint(_state);
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
            skillsets: "",
            currentPosition: "",
            linkedinProfile: "",
            yearsOfExperience: 0
        });

        Job.applications.push(newApplication);
        uint256 applicationId = Job.applications.length - 1;

        candidateId_applicationIds[candidate_id].push(applicationId);
        referrerId_applicationIds[referrer_id].push(applicationId);
        jobToApplicationCount[job_id]++;
    }

    ////////////////////////////////////Candidate functions//////////////////////////////////////////////////////
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

    struct CandidateApplicationStruct {
        JobStructure job;
        Application application;
    }

    function seeAllAppliedOrReferredJobs()
        public
        view
        onlyCandidate
        returns (CandidateApplicationStruct[] memory)
    {
        uint256 candidate_id = address_candidateId[msg.sender];
        uint256[] memory applicationIds = candidateId_applicationIds[
            candidate_id
        ];

        CandidateApplicationStruct[]
            memory applicationsToSend = new CandidateApplicationStruct[](
                applicationIds.length
            );

        for (uint256 i = 0; i < applicationIds.length; i++) {
            Application memory application = applications[i];

            applicationsToSend[i] = CandidateApplicationStruct({
                job: jobs[application.jobId],
                application: application
            });
        }
        return applicationsToSend;
    }

    function applyToJob(
        uint256 _jobId,
        uint256 yearsOfExperience,
        string memory skillsets,
        string memory currentPosition,
        string memory linkedinProfile
    ) public onlyCandidate {
        uint256 candidateId = address_candidateId[msg.sender];
        Application memory newApplication = Application({
            candidateId: candidateId,
            referrerId: 0,
            jobId: _jobId,
            hiringStatus: HiringStatus.WAITING,
            skillsets: skillsets,
            currentPosition: currentPosition,
            linkedinProfile: linkedinProfile,
            yearsOfExperience: yearsOfExperience
        });

        applications.push(newApplication);
        uint256 applicationId = Job.applications.length - 1;

        candidateId_applicationIds[candidateId].push(applicationId);
        jobToApplicationCount[_jobId]++;
    }
}
