//Maintain details of objects as struct
//Maintain links between objects as maps



/////////////////////////////////////////////Non-acting entities/////////////////////////////////////////
struct Company{
    string company_name,    
}
Company[] companies;
mapping(uint => uint[]) companyId_jobIds;

struct Job{
    string designation,
    string job_description,
    string role_name,
    string salary_range,
    uint stake_amount,
    enum job_status {open, closed}
}
Job[] jobs; //idx becomes jobId
mapping(uint => uint) jobId_companyId;
mapping(uint => uint[]) jobId_candidateIds;




////////////////////////////////////////////////Acting entities////////////////////////////////////////////////
struct Recruiter{
    string name,
    string email,
    bool exists
}
Recruiter[] recruiters;
mapping(address => uint) recruiterAddress_recruiterId;
mapping(uint => uint[]) recruiterId_openJobsIds;
mapping(uint => uint) recruiterId_companyId; //assuming recruiter belongs to only 1 company


struct Referrer{
    string name,
    string email,
    string community_name,
    uint reputation_score,
    uint total_rewards_earned,
    bool exists
}
Referrer[] referrers; //idx becomes referrerId
mapping(address => uint) referrerAddress_referrerId;
mapping(uint => uint[]) referrerId_candidateIds;


struct Candidate{
    string name,
    string current_company_name,
    bool exists
}
Candidate[] candidates; //idx becomes candidateId
mapping(address => uint) candidateAddress_candidateId;
mapping(uint => uint[]) candidateId_appliedJobIds;
mapping(uint => uint[]) cadidateId_referrerIds;

enum InterviewStatusEnum {WAITING, ROUND1, ROUND2, ACCEPTED, REJECTED};
mapping(uint => mapping(uint=> InterviewStatusEnum)) cadidateId_jobId_interviewStatus;





//Functions:
// For every create,update there should be a function to get the data as well










