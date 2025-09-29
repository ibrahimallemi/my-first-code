// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleNameNumber {
    string private _name;
    uint256 private _number;
    address public owner;

    event InfoUpdated(string name, uint256 number, address indexed updater);

    constructor(string memory initialName, uint256 initialNumber) {
        owner = msg.sender;
        _name = initialName;
        _number = initialNumber;
        emit InfoUpdated(initialName, initialNumber, msg.sender);
    }

    function setInfo(string memory newName, uint256 newNumber) public {
        require(msg.sender == owner, "Only owner can update");
        _name = newName;
        _number = newNumber;
        emit InfoUpdated(newName, newNumber, msg.sender);
    }

    function getInfo() public view returns (string memory name_, uint256 number_) {
        return (_name, _number);
    }
}
