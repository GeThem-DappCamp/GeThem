//Maintain details of objects as struct
//Maintain links between objects as maps



/////////////////////////////////////////////Non-acting entities/////////////////////////////////////////
struct Company{
    string company_name,    
}
Company[] companies;
mapping(uint => uint[]) companyId_ jobIds;

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
    address recruiter_address
}
Recruiter[] recruiters;
mapping(address => uint) recruiterAddress_recruiterId;
mapping(uint => uint[]) recruiterId_openJobsIds;
mapping(uint => uint) recruiterId_companyId; //assuming recruiter belongs to only 1 company


struct Candidate{
    string name,
    string current_company_name
}
Candidate[] candidates; //idx becomes candidateId
mapping(address => uint) candidateAddress_candidateId;
mapping(uint => uint[]) candidateId_appliedJobIds;
mapping(uint => uint[]) cadidateId_referrerIds;

enum InterviewStatusEnum {applied, interview1, interview2, hired, rejected};
mapping(uint => mapping(uint=> InterviewStatusEnum)) cadidateId_jobId_interviewStatus;

struct Referrer{
    string name,
    string email,
    string community_name,
    uint reputation_score,
    uint total_rewards_earned
}
Referrer[] referrers; //idx becomes referrerId
mapping(address => uint) referrerAddress_referrerId;
mapping(uint => uint[]) referrerId_candidateIds;





//Functions:
// For every create,update there should be a function to get the data as well










