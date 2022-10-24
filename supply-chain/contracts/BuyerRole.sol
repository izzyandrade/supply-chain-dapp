pragma solidity >=0.8.7;

import "./Roles.sol";

contract BuyerRole {
    using Roles for Roles.Role;

    event BuyerAdded(address indexed account);
    event BuyerRemoved(address indexed account);

    Roles.Role private buyers;

    constructor() {
        _addBuyer(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyBuyer() {
        require(isBuyer(msg.sender));
        _;
    }

    // Define a function 'isBuyer' to check this role
    function isBuyer(address account) public view returns (bool) {
        return buyers.has(account);
    }

    // Define a function 'addBuyer' that adds this role
    function addBuyer(address account) public onlyBuyer {
        _addBuyer(account);
    }

    // Define a function 'renounceBuyer' to renounce this role
    function renounceBuyer() public {
        _removeBuyer(msg.sender);
    }

    // Define an internal function '_addBuyer' to add this role, called by 'addBuyer'
    function _addBuyer(address account) internal {
        buyers.add(account);
        emit BuyerAdded(account);
    }

    // Define an internal function '_removeBuyer' to remove this role, called by 'removeBuyer'
    function _removeBuyer(address account) internal {
        buyers.remove(account);
        emit BuyerRemoved(account);
    }
}
