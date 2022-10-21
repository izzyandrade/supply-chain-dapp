pragma solidity >=0.8.7;

import "./Roles.sol";

contract RegulatorRole {
    using Roles for Roles.Role;

    event RegulatorAdded(address indexed account);
    event RegulatorRemoved(address indexed account);

    Roles.Role private regulators;

    constructor() public {
        _addRegulator(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyRegulator() {
        require(isRegulator(msg.sender));
        _;
    }

    // Define a function 'isRegulator' to check this role
    function isRegulator(address account) public view returns (bool) {
        return regulators.has(account);
    }

    // Define a function 'addRegulator' that adds this role
    function addRegulator(address account) public onlyRegulator {
        _addRegulator(account);
    }

    // Define a function 'renounceRegulator' to renounce this role
    function renounceRegulator() public {
        _removeRegulator(msg.sender);
    }

    // Define an internal function '_addRegulator' to add this role, called by 'addRegulator'
    function _addRegulator(address account) internal {
        regulators.add(account);
        emit RegulatorAdded(account);
    }

    // Define an internal function '_removeRegulator' to remove this role, called by 'removeRegulator'
    function _removeRegulator(address account) internal {
        regulators.remove(account);
        emit RegulatorRemoved(account);
    }
}
