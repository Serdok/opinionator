// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @dev The core logic is given by the Governor contract, but we still need to choose:
 *      1) how voting power is determined,
 *      2) how many votes are needed for quorum,
 *      3) what options people have when casting a vote and how those votes are counted, and
 *      4) what type of token should be used to vote.
 *
 * We are also adding a timelock. This allows users to exit the system if they disagree with a decision before it is executed.
 */
contract Opinionator is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl {
    constructor(IVotes token, TimelockController timelock, uint _quorum, uint delay, uint period)
    Governor("Opinionator")
    GovernorSettings(delay, period, 0 /* proposal threshold */)
    GovernorVotes(token)
    GovernorVotesQuorumFraction(_quorum)
    GovernorTimelockControl(timelock)
    {

    }

    /**
     * @dev Delay, in number of block, between the proposal is created and the vote starts.
     */
    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint) {
        return super.votingDelay();
    }

    /**
     * @dev Delay, in number of blocks, between the vote start and vote ends.
     */
    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint) {
        return super.votingPeriod();
    }

    /**
     * @dev Number of votes before an executor can become an proposer
     */
    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint) {
        return super.proposalThreshold();
    }

    /**
     * @dev Returns the quorum for a block number, in terms of number of votes: `supply * numerator / denominator`.
     */
    function quorum(uint block_number) public view override(IGovernor, GovernorVotesQuorumFraction) returns (uint) {
        return super.quorum(block_number);
    }

    /**
     * @dev Voting power of an `account` at a specific `blockNumber`.
     */
    function getVotes(address account, uint block_number) public view override(Governor, IGovernor) returns (uint) {
        return super.getVotes(account, block_number);
    }

    /**
     * @dev Current state of a proposal, following Compound's convention
     */
    function state(uint proposal) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposal);
    }

    /**
     * @dev Create a new proposal. Vote start {IGovernor-votingDelay} blocks after the proposal is created and ends
     * {IGovernor-votingPeriod} blocks after the voting starts.
     * Emits a {ProposalCreated} event.
     */
    function propose(address[] memory targets, uint[] memory values, bytes[] memory calldatas, string memory description)
    public override(Governor, IGovernor) returns(uint)
    {
        return super.propose(targets, values, calldatas, description);
    }

    /**
     * @dev Internal execution mechanism.
     */
    function _execute(uint proposal, address[] memory targets, uint[] memory values, bytes[] memory calldatas, bytes32 description_hash)
    internal override(Governor, GovernorTimelockControl)
    {
        super._execute(proposal, targets, values, calldatas, description_hash);
    }

    /**
     * @dev Internal cancel mechanism: locks up the proposal timer, preventing it from being re-submitted. Marks it as
     * canceled to allow distinguishing it from executed proposals.
     * Emits a {IGovernor-ProposalCanceled} event.
     */
    function _cancel(address[] memory targets, uint[] memory values, bytes[] memory calldatas, bytes32 description_hash)
    internal override(Governor, GovernorTimelockControl) returns (uint)
    {
        return super._cancel(targets, values, calldatas, description_hash);
    }

    function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }

    function supportsInterface(bytes4 interface_id) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interface_id);
    }
}
