// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    string private m_value;

    event ValueChanged(string old_value, string new_value);

    function set(string memory value) public onlyOwner {
        string memory old_value = m_value;
        m_value = value;
        emit ValueChanged(old_value, m_value);
    }

    function get() public view returns (string memory) {
        return m_value;
    }
}