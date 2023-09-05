// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface ISubscriptionOwner {
    function getSubscriptionOwner() external view returns (address);
}
