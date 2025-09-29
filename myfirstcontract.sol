// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string private myMessage = "Hello, Remix!"; // ✅ initialized here

    function message() public view returns (string memory) {
        return myMessage;
    }
}
