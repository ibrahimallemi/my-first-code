// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BankFixed {
    address public owner;
    mapping(address => uint256) public balances;

    // simple reentrancy guard
    bool private locked;

    event Deposited(address indexed who, uint256 amount);
    event Withdrawn(address indexed who, uint256 amount);

    constructor() {
        owner = msg.sender;
        locked = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    // Deposit money (payable)
    function deposit() public payable {
        require(msg.value > 0, "Must deposit more than 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw money — safe pattern
    function withdraw(uint256 _amount) public nonReentrant {
        require(balances[msg.sender] >= _amount, "Not enough balance");

        // Effects (update state) before interaction
        balances[msg.sender] -= _amount;

        // Interaction: low-level call and check success
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Transfer failed");

        emit Withdrawn(msg.sender, _amount);
    }

    // Only owner can check contract balance
    function contractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}
