// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


/////////////////////////////////////////////Notes/////////////////////////////////////////////

// contract GeThem is Job, Recruiter, Referrer, Candidate {
// }

//Maintain details of objects as struct
//Maintain links between objects as maps

//Functions:
// For every create,update there should be a function to get the data as well

/////////////////////////////////////////////Notes/////////////////////////////////////////////




// import "@openzeppelin/contracts/access/Ownable.sol";

contract GeThem {



    /////////////////////////////////////////////Non-acting entities/////////////////////////////////////////////
    struct Company {
        string company_name;
    }
    Company[] companies;
    mapping(uint256 => uint256[]) companyId_jobIds;

    enum Job_status {
        OPEN,
        CLOSED
    }

    struct Job {
        string designation;
        string job_description;
        string role_name;
        string salary_range;
        uint256 stake_amount;
        Job_status job_status;
    }
    Job[] jobs; //idx becomes jobId
    mapping(uint256 => uint256) jobId_companyId;
    mapping(uint256 => uint256[]) jobId_candidateIds;

    // function createJob() {}

    // function getAllOpenJobsForReferrer() {}

    // function getOpenJobsForRecruiter(address recruiter_address) {}





    /////////////////////////////////////////////Acting entities/////////////////////////////////////////////

    /////////////////////////////////////////////Recruiter/////////////////////////////////////////////
    struct Recruiter {
        string name;
        string email;
        bool exists;
    }
    Recruiter[] recruiters;
    mapping(address => uint256) recruiterAddress_recruiterId;
    mapping(uint256 => uint256[]) recruiterId_openJobsIds;
    mapping(uint256 => uint256) recruiterId_companyId; //assuming recruiter belongs to only 1 company



    /////////////////////////////////////////////Referrer/////////////////////////////////////////////
    struct Referrer {
        string name;
        string email;
        string community_name;
        uint256 reputation_score;
        uint256 total_rewards_earned;
        bool exists;
    }

    Referrer[] referrers; //idx becomes referrerId
    mapping(address => uint256) referrerAddress_referrerId;
    mapping(uint256 => uint256[]) referrerId_candidateIds;



    /////////////////////////////////////////////Candidate/////////////////////////////////////////////
    struct Candidate {
        string name;
        string current_company_name;
        bool exists;
    }
    Candidate[] candidates; //idx becomes candidateId
    mapping(address => uint256) candidateAddress_candidateId;
    mapping(uint256 => uint256[]) candidateId_appliedJobIds;
    mapping(uint256 => uint256[]) cadidateId_referrerIds;

    enum InterviewStatusEnum {
        WAITING,
        ROUND1,
        ROUND2,
        ACCEPTED,
        REJECTED
    }
    mapping(uint256 => mapping(uint256 => InterviewStatusEnum)) cadidateId_jobId_interviewStatus;


}

