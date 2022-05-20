// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Referrer {
    struct ReferrerStruct {
        string name;
        string email;
        string community_names;
        uint256 reputation_score;
        uint256 referral_count;
        uint256 total_rewards_earned;
        bool exists;
        address referrer_address;
    }

    ReferrerStruct[] referrers;
    mapping(address => uint256) referrerAddress_referrerId;

    function createReferrerAccount(
        string memory _name,
        string memory _email,
        string memory _community_names
    ) public {
        ReferrerStruct memory newReferrer = ReferrerStruct({
            name: _name,
            email: _email,
            community_names: _community_names,
            reputation_score: 0,
            referral_count: 0,
            total_rewards_earned: 0,
            exists: true,
            referrer_address: msg.sender
        });
        referrers.push(newReferrer);
        uint256 referrerId = referrers.length - 1;
        referrerAddress_referrerId[msg.sender] = referrerId;
    }

    function isReferrer(address referrer_address) public view returns (bool) {
        uint256 referrerId = referrerAddress_referrerId[referrer_address];
        if (referrers[referrerId].exists) {
            return true;
        }
        return false;
    }

    function referCandidate() public {
        //create a candidate if not present
        //create an application based on job_id, candidate_id
    }
}
