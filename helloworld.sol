// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // State variable
    string public message = "Hello, World!";

    // Function to get message
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Function to change the message
    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}
