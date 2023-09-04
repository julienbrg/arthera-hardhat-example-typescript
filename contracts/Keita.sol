// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ISubscriptionOwner.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/// @custom:security-contact julien@strat.cc
contract Keita is ERC165, Ownable {
    /// @notice Total number of talent contests won by Keita
    uint public wins;

    event Danced(uint indexed wins);

    /// @notice Inrements `dances`
    function dance() public {
        wins += 1;
        emit Danced(wins);
    }

    function getSubscriptionOwner() external view returns (address) {
        return owner();
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC165) returns (bool) {
        return
            interfaceId == type(ISubscriptionOwner).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
