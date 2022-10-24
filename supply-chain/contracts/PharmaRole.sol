pragma solidity >=0.8.7;

import "./Roles.sol";

contract PharmaRole {
    using Roles for Roles.Role;

    event PharmaAdded(address indexed account);
    event PharmaRemoved(address indexed account);

    Roles.Role private pharmas;

    constructor() {
        _addPharma(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyPharma() {
        require(isPharma(msg.sender));
        _;
    }

    // Define a function 'isPharma' to check this role
    function isPharma(address account) public view returns (bool) {
        return pharmas.has(account);
    }

    // Define a function 'addPharma' that adds this role
    function addPharma(address account) public onlyPharma {
        _addPharma(account);
    }

    // Define a function 'renouncePharma' to renounce this role
    function renouncePharma() public {
        _removePharma(msg.sender);
    }

    // Define an internal function '_addPharma' to add this role, called by 'addPharma'
    function _addPharma(address account) internal {
        pharmas.add(account);
        emit PharmaAdded(account);
    }

    // Define an internal function '_removePharma' to remove this role, called by 'removePharma'
    function _removePharma(address account) internal {
        pharmas.remove(account);
        emit PharmaRemoved(account);
    }
}
