// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    constructor(uint min_delay, address[] memory proposers, address[] memory executors)
    TimelockController(min_delay, proposers, executors)
    {

    }
}