
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
    };

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

    function createJob() {}
    function getAllOpenJobsForReferrer() {}
    function getOpenJobsForRecruiter(address recruiter_address) {}


    /////////////////////////////////////////////Acting entities/////////////////////////////////////////////

    enum InterviewStatusEnum {
        WAITING,
        ROUND1,
        ROUND2,
        ACCEPTED,
        REJECTED
    }

    struct Person{
        bool name,
        string email
    }
    Person[] people;
    
    /////////////////////////////////////////////Recruiter/////////////////////////////////////////////
    struct Recruiter {
        bool exists;
    }
    Recruiter[] recruiters;
    mapping(address => uint256) recruiterAddress_recruiterId;
    mapping(uint256 => uint256[]) recruiterId_openJobsIds;
    mapping(uint256 => uint256) recruiterId_personId;
    // mapping(uint256 => uint256[]) recruiterId_companyIds; //assuming recruiter belongs to only 1 company

    function registerRecruiter(string name, string email){}
    function updateInterviewStatus(uint candidate_id, InterviewStatusEnum interviewStatus){}
        function distributeRewards(){} //internally called in above function if status is updated hired
        function updateReputationScore(uint referrer_id){} //internally called in above function based on status update
        function closeJobApplication(){} //internally called in above function if status is updated rejected
    function getTopReferrers(){} //gasless/meta-transaction required


    /////////////////////////////////////////////Referrer/////////////////////////////////////////////
    struct Referrer {
        string community_name;
        uint256 reputation_score;
        uint256 total_rewards_earned;
        bool exists;
    }

    Referrer[] referrers; //idx becomes referrerId
    mapping(address => uint256) referrerAddress_referrerId;
    mapping(uint256 => uint256[]) referrerId_candidateIds;
    // function 


    /////////////////////////////////////////////Candidate/////////////////////////////////////////////
    struct Candidate {
        string current_company_name;
        bool exists;
    }
    Candidate[] candidates; //idx becomes candidateId
    mapping(address => uint256) candidateAddress_candidateId;
    mapping(uint256 => uint256[]) candidateId_appliedJobIds;
    mapping(uint256 => uint256[]) cadidateId_referrerIds;
    mapping(uint256 => mapping(uint256 => InterviewStatusEnum)) cadidateId_jobId_interviewStatus;


}