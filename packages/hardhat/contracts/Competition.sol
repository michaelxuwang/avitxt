pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Competition is Ownable {

  using EnumerableSet for EnumerableSet.AddressSet;

  event InfoChanged();

  // basic info
  string public name;
  string public info;
  string public category;
  string public detailsFile;
  
  // dates
  uint256 public openDate;
  uint256 public closeDate;
  uint256 public finalizeDate;

  // state and state transition
  enum State {
    Created,
    Open,
    Closed,
    Reviewing,
    Finalized
  }
  State public state = State.Created;
  event StateChanged(State state);

  // submission requirements
  uint256 public submissionFee;
  string public submissionDetailsFile;

  string[] public externalDataSourceLabels;
  string[] public externalDataSourceUrls;

  string[] public requirementLabels;
  uint256[] public requirementWeights;
  uint256 public requirementTotalWeight;

  // score sheet
  struct ScoreSheet {
    uint256[] scores;
    address judge;
    uint256 scoreDate;
    uint256 weightedScore;
  }

  // submissions
  struct Submission {
    string info;
    uint256 submissionDate;
    ScoreSheet[] allScoreSheets;
    address[] judges;
    mapping(address => ScoreSheet) scoreSheets;
    uint weightedScore;
  }
  
  address[] public applicants;
  mapping(address => Submission) public submissions;
  event SubmissionAdded(address submissionId);

  event SubmissionScored(address submissionId, address judge);

  // admission officers/judges
  EnumerableSet.AddressSet private judges;

  constructor() {
  }

  function setAllInfo(
    string memory _name,
    string memory _info,
    string memory _category,
    string memory _detailsFile,
    uint256 _openDate,
    uint256 _closeDate,
    uint256 _finalizeDate,
    uint256 _submissionFee,
    string memory _submissionDetailsFile,
    // string[] memory _externalDataSourceLabels,
    // string[] memory _externalDataSourceUrls,
    string[] memory _requirementLabels,
    uint256[] calldata _weights
    ) public onlyOwner {
    name = _name;
    info = _info;
    category = _category;
    detailsFile = _detailsFile;
    openDate = _openDate;
    closeDate = _closeDate;
    finalizeDate = _finalizeDate;
    submissionFee = _submissionFee;
    submissionDetailsFile = _submissionDetailsFile;
    // externalDataSourceLabels = _externalDataSourceLabels;
    // externalDataSourceUrls = _externalDataSourceUrls;
    setRequirements(_requirementLabels, _weights);

    emit InfoChanged();
  }

  function setInfo(string memory _name, string memory _info, string memory _category) public onlyOwner {
    name = _name;
    info = _info;
    category = _category;
  }

  function setState(State _state) public onlyOwner {
    state = _state;
    
    //TODO: check judges and weights before changing states

    emit StateChanged(state);
  }

  function getExternalDataSources() public view returns (string[] memory labels, string[] memory urls) {
    labels = externalDataSourceLabels;
    urls = externalDataSourceUrls;
  }

  function setRequirements(string[] memory _requirementLabels, uint256[] calldata _weights) public onlyOwner {
    requirementLabels = _requirementLabels;
    requirementWeights = _weights;

    requirementTotalWeight = 0;
    for (uint256 i=0; i<_weights.length; i++)
      requirementTotalWeight += _weights[i];
  }

  function getRequirement() public view returns (string[] memory labels, uint256[] memory weights) {
    labels = requirementLabels;
    weights = requirementWeights;
  }

  function addJudge(address judge) public onlyOwner {
    judges.add(judge);
  }

  function getJudges() public view returns(address[] memory) {
    return judges.values();
  }

  function getMyRoles() public view returns(bool isOwner, bool isJudge, bool isApplicant) {
    return getRoles(msg.sender);
  }

  function getRoles(address caller) public view returns(bool isOwner, bool isJudge, bool isApplicant) {
    isOwner = (owner() == caller);
    isJudge = judges.contains(caller);
    isApplicant = (submissions[caller].submissionDate != 0);
  }

  function addSubmission(string memory _info) public {
    address applicant = msg.sender;

    Submission storage submission = submissions[applicant];
    if (submission.submissionDate == 0)
      applicants.push(applicant);
    submission.info = _info;
    submission.submissionDate = block.timestamp;

    emit SubmissionAdded(applicant);
  }

  function getApplicants() public view returns(address[] memory) {
    return applicants;
  }

  function scoreSubmission(address _applicant, uint256[] calldata _scores) public {
    require(_scores.length == requirementWeights.length, "Mismatching number of scores");

    address judge = msg.sender;
    require(judges.contains(judge), "Only judges can score submissions");

    Submission storage submission = submissions[_applicant];
    require(submission.submissionDate > 0, "Cannot find submission");

    ScoreSheet storage scoreSheet = submission.scoreSheets[judge];

    // if judge scored this submission before
    if (scoreSheet.scoreDate > 0) {
      // remove the old score first
      if (submission.judges.length <= 1)
        submission.weightedScore = 0;
      else
        submission.weightedScore = (submission.weightedScore * submission.judges.length - scoreSheet.weightedScore)
                               / (submission.judges.length - 1);
    } else {
      submission.judges.push(judge);
    }

    scoreSheet.scores = _scores;
    scoreSheet.scoreDate = block.timestamp;
    scoreSheet.judge = judge;

    uint256 totalWeightedScore = 0;
    for (uint256 i=0; i<_scores.length; i++)
      totalWeightedScore += _scores[i] * requirementWeights[i];

    scoreSheet.weightedScore = totalWeightedScore / requirementTotalWeight;
    submission.weightedScore = (submission.weightedScore * (submission.judges.length - 1) + scoreSheet.weightedScore)
                             / submission.judges.length;

    submission.allScoreSheets.push(scoreSheet);

    emit SubmissionScored(_applicant, judge);
  }

  // function getSubmissionJudgeCount(address _applicant) public view returns(uint256) {
  //   Submission storage submission = submissions[_applicant];
  //   return submission.judges.length;
  // }

  function getSubmissionJudges(address _applicant) public view returns(address[] memory) {
    Submission storage submission = submissions[_applicant];
    return submission.judges;
  }

  function getSubmissionScoreSheetByJudge(address _applicant, address judge) public view returns(ScoreSheet memory) {
    Submission storage submission = submissions[_applicant];
    return submission.scoreSheets[judge];
  }

  function getSubmissionScoreSheetCount(address _applicant) public view returns(uint256) {
    Submission storage submission = submissions[_applicant];
    return submission.allScoreSheets.length;
  }
  
  function getSubmissionScoreSheetAt(address _applicant, uint256 index) public view returns(ScoreSheet memory sheet, uint256[] memory scores) {
    Submission storage submission = submissions[_applicant];
    sheet = submission.allScoreSheets[index];
    scores = sheet.scores;
  }

  function getSubmissionScoreSheets(address _applicant) public view returns(ScoreSheet[] memory) {
    Submission storage submission = submissions[_applicant];
    return submission.allScoreSheets;
  }
}
