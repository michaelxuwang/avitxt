pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./lib/Strings.sol";

contract Competition is ChainlinkClient, Ownable {

  using Chainlink for Chainlink.Request;
  using EnumerableSet for EnumerableSet.AddressSet;
  using Strings for string;

  event InfoChanged();

  // basic info
  string public name;
  string public info;
  string public category;
  
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

  // requirements
  string public requirementsInfo;
  string[] public scoringRubricLabels;
  uint256[] public scoringRubricWeights;
  uint256 public scoringRubricTotalWeight;

  string[] public externalDataSourceLabels;
  string[] public externalDataSourceUrls;
  bytes32[] public externalDataSourceJobIds;

  event ExternalDataFetched();

  // funding
  uint256 public submissionFee;

  // score sheet
  struct ScoreSheet {
    uint256[] scores;
    address judge;
    uint256 scoreDate;
    uint256 weightedScore;
  }

  // submissions
  struct Submission {
    string name;
    string uid;
    string info;
    string file;
    string[] externalData;
    uint256 submissionDate;
    ScoreSheet[] allScoreSheets;
    address[] judges;
    mapping(address => ScoreSheet) scoreSheets;
    uint weightedScore;
  }
  
  address[] public applicants;
  mapping(address => Submission) public submissions;
  mapping(string => address) public uidsToApplicants; // uid to applicant
  event SubmissionAdded(address submissionId);

  event SubmissionScored(address submissionId, address judge);

  // admission officers/judges
  EnumerableSet.AddressSet private judges;

  constructor() {
    setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
    setChainlinkOracle(0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8);
  }

  function setBasicInfo(string memory _name, string memory _info, string memory _category) public onlyOwner {
    name = _name;
    info = _info;
    category = _category;
  }

  function setInfo(
    string memory _name,
    string memory _info,
    string memory _category,
    uint256 _openDate,
    uint256 _closeDate,
    uint256 _finalizeDate
    ) public onlyOwner {
    name = _name;
    info = _info;
    category = _category;
    openDate = _openDate;
    closeDate = _closeDate;
    finalizeDate = _finalizeDate;

    emit InfoChanged();
  }

  function setState(State _state) public onlyOwner {
    state = _state;
    
    //TODO: check judges and weights before changing states

    emit StateChanged(state);
  }

  function setRequirements(
    string memory _requirementsInfo,
    string[] memory _scoringRubricLabels,
    uint256[] calldata _scoringRubricWeights,
    string[] memory _externalDataSourceLabels,
    string[] memory _externalDataSourceUrls
    ) public onlyOwner {
    requirementsInfo = _requirementsInfo;
    externalDataSourceLabels = _externalDataSourceLabels;
    externalDataSourceUrls = _externalDataSourceUrls;
    setScoringRubrics(_scoringRubricLabels, _scoringRubricWeights);

    emit InfoChanged();
  }

  function getExternalDataSources() public view returns (string[] memory labels, string[] memory urls) {
    labels = externalDataSourceLabels;
    urls = externalDataSourceUrls;
  }

  function setScoringRubrics(string[] memory _scoringRubricLabels, uint256[] calldata _weights) public onlyOwner {
    scoringRubricLabels = _scoringRubricLabels;
    scoringRubricWeights = _weights;

    scoringRubricTotalWeight = 0;
    for (uint256 i=0; i<_weights.length; i++)
      scoringRubricTotalWeight += _weights[i];
  }

  function getScoringRubrics() public view returns (string[] memory labels, uint256[] memory weights) {
    labels = scoringRubricLabels;
    weights = scoringRubricWeights;
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

  function setSubmissionFee(uint256 fee) public onlyOwner {
    submissionFee = fee;
  }

  function addSubmission(string memory _name, string memory _uid, string memory _info, string memory _file) public payable {
    address applicant = msg.sender;

    Submission storage submission = submissions[applicant];
    if (submission.submissionDate == 0)
      applicants.push(applicant);
    submission.name = _name;
    submission.uid = _uid;
    submission.info = _info;
    submission.file = _file;
    submission.submissionDate = block.timestamp;

    uidsToApplicants[_uid] = applicant;

    emit SubmissionAdded(applicant);
  }

  function getApplicants() public view returns(address[] memory) {
    return applicants;
  }

  function scoreSubmission(address _applicant, uint256[] calldata _scores) public {
    require(_scores.length == scoringRubricWeights.length, "Mismatching number of scores");

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
      totalWeightedScore += _scores[i] * scoringRubricWeights[i];

    scoreSheet.weightedScore = totalWeightedScore / scoringRubricTotalWeight;
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

  function getSubmissionExternalData(address _applicant) public view returns(string[] memory) {
    Submission storage submission = submissions[_applicant];
    return submission.externalData;
  }

  function fetchExternalData() public onlyOwner {
    string[] memory clearExternalData = new string[](externalDataSourceUrls.length);

    string memory uids = "";
    for (uint256 i=0; i<applicants.length; i++) {
      Submission storage submission = submissions[applicants[i]];
      uids = string(abi.encodePacked(uids, submission.uid, ","));
      submission.externalData = clearExternalData;
    }

    delete externalDataSourceJobIds;
    for (uint256 i=0; i<externalDataSourceUrls.length; i++) {
      externalDataSourceJobIds.push(fetchExternalDataFrom(externalDataSourceUrls[i], uids));
      // fetchExternalDataFrom(externalDataSourceUrls[i], uids);
      // externalDataSourceJobIds.push(bytes32(i));
    }
  }

  function fetchExternalDataFrom(string memory url, string memory uids) internal returns (bytes32) {
    console.log(url);
    console.log(uids);
    string memory entireUrl = url.concat(uids);

    bytes32 specId = "7a97ff8493ec406d90621b2531f9251a";
    uint256 payment = 100000000000000000;
    Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), this.fulfillBytes.selector);
    req.add("get", entireUrl);
    req.add("path", "result");
    requestOracleData(req, payment);
    return req.id;
    // emit ExternalDataFetched();
  }

  event RequestFulfilled(
    bytes32 indexed requestId,
    bytes indexed data
  );
  
  function fulfillBytes(
    bytes32 requestId,
    bytes memory bytesData
    // string memory data
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestFulfilled(requestId, bytesData);
    string memory data = string(bytesData);

    console.log("data");
    console.log(data);

    uint256 dataSourceIndex = 0;
    for (; dataSourceIndex<externalDataSourceJobIds.length; dataSourceIndex++) {
      if (externalDataSourceJobIds[dataSourceIndex] == requestId)
        break;
    }
    console.log(dataSourceIndex);

    string[] memory ids = data.split(",");
    for (uint256 i=0; i<ids.length; i++) {
      console.log(ids[i]);
      string[] memory applicantData = ids[i].split(":");
      address applicant = uidsToApplicants[applicantData[0]];
      console.log(applicantData[0], applicantData[1], applicant);

      Submission storage submission = submissions[applicant];
      submission.externalData[dataSourceIndex] = applicantData[1];
    }
  }
}
