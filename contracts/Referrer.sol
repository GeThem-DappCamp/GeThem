// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

// import "hardhat/console.sol";

contract Referrer {

      modifier onlyReferrer() {
        require(
            Referrer.isReferrer(msg.sender),
            "Error sender is not a referrer"
        );
        _;
    }

    function checkReputationScore() public view onlyReferrer returns (uint) {
        return referrers[address_referrerId[msg.sender]].reputation_score;
    }

    struct ReferrerStruct {
        string name;
        string email;
        string community_names;
        uint256 reputation_score;
        uint256 referral_count;
        uint256 total_rewards_earned;
        bool exist;
    }

    mapping(uint256 => ReferrerStruct) public referrers;
    mapping(address => uint256) public address_referrerId;
    mapping(uint => address) public referrerId_address;

    uint256 public referrerCount;


    function createReferrer(
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
            exist: true
        });
        referrerCount++;
        referrers[referrerCount] = newReferrer;
        address_referrerId[msg.sender] = referrerCount;
        referrerId_address[referrerCount] = msg.sender;
    }

    function editReferrer(string memory name, string memory email, string memory community_names) public onlyReferrer {
        referrers[address_referrerId[msg.sender]].name = name;
        referrers[address_referrerId[msg.sender]].email = email;
        referrers[address_referrerId[msg.sender]].community_names = community_names;
    }

    function isReferrer(address referrer_address) internal view returns (bool) {
        uint256 referrerId = address_referrerId[referrer_address];
        if (referrerId != 0 && referrers[referrerId].exist) {
            return true;
        }
        return false;
    }
}