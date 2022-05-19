// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/access/Ownable.sol";
import "./JobFactory.sol";
import "./RecruiterHelper.sol";
import "./CandidateHelper.sol";
import "./ReferrerHelper.sol";

contract JobHelper is JobFactory, RecruiterHelper, CandidateHelper, ReferrerHelper {
    function createJob(
        string memory company_name,
        string memory company_logo,
        string memory details,
        string memory salary,
        string memory job_type,
        uint256 amount
    ) public payable {
        Stake memory stake = Stake(address(this), amount, block.timestamp);
        Job memory job = Job(company_name, company_logo, details, salary, job_type, block.timestamp, JobStatus.OPEN, stake);
        jobs.push(job);
        uint id = jobs.length - 1;
        jobCount++;
        jobToRecruiter[id] = msg.sender;
        recruiterToJobCount[msg.sender]++;
    }

    function showJobsByRecruiter() view external returns (Job[] memory) {
        Job[] memory showJobs = new Job[](recruiterToJobCount[msg.sender]);
        uint counter = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobToRecruiter[i] == msg.sender) {
                showJobs[counter] = jobs[i];
                counter++;
            }
        }
        return showJobs;
    }

    function closeJob(uint _jobId) public {
        require(jobToRecruiter[_jobId] == msg.sender);
        require(isRecruiter(msg.sender));
        jobs[_jobId].status = JobStatus.CLOSED;
    } 

    function changeCandidateStatus(uint _statusCode, uint _candidateId, uint _jobId) public {
        require(jobToRecruiter[_jobId] == msg.sender);
        require(isRecruiter(msg.sender));

    }

    // function applyToJob() {

    // }

    // function showAllOpenJobs() {

    // }

    // function referToJob(uint _referrerCount) {
        referrer[_referrerId].referrerCount++;
    // }

    // function showJobsByReferrer() {

    // }

    // function showJobDetailsById() {

    // }

    //  function showJobsByCandidate() {

    // }

    function retrieveFees() onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}