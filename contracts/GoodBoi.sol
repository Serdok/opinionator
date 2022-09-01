// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract GoodBoi is ERC20, ERC20Permit, ERC20Votes {
    uint public constant m_max_supply = 1000000000000000;

    constructor() ERC20("GoodBoi", "GBY") ERC20Permit("GoodBoi") {
        _mint(msg.sender, m_max_supply);
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `account`, increasing their voting power
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Preconditions:
     *      - `account` cannot be the zero address.
     */
    function _mint(address to, uint amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, decreasing their voting power
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Preconditions:
     *      - `account` cannot be the zero address.
     *      - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    /**
     * @dev Hook that is called after any transfer of tokens. This includes minting and burning.
     * Move voting power when tokens are transferred.
     * Emits a {DelegateVotesChanged} event.
     *
     * Calling conditions:
     *      - when `from` and `to` are both non-zero, `amount` of `from`'s tokens has been transferred to `to`.
     *      - when `from` is zero, `amount` tokens have been minted for `to`.
     *      - when `to` is zero, `amount` of `from`'s tokens have been burned.
     *      - `from` and `to` are never both zero.
     */
    function _afterTokenTransfer(address from, address to, uint amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }
}
