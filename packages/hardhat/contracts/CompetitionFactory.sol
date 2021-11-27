pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./Competition.sol";

contract CompetitionFactory {
    Competition[] public competitions;
    event CompetitionCreated(address competitionAddress, string name, string info, string category);

    constructor() {
    }

    function createCompetition(string memory _name, string memory _info, string memory _category) external returns(address) {
        Competition competition = new Competition();
        competition.setBasicInfo(_name, _info, _category);
        competition.transferOwnership(msg.sender);
        competitions.push(competition);

        emit CompetitionCreated(address(competition), _name, _info, _category);
        return address(competition);
    }

    function getCompetitions() external view returns(Competition[] memory) {
        return competitions;
    }
}