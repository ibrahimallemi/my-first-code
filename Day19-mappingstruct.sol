// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    // 1. Define a struct
    struct Student {
        string name;
        uint256 age;
        bool enrolled;
    }

    // 2. Mapping: address → Student
    mapping(address => Student) public students;

    // 3. Register a student
    function registerStudent(string memory _name, uint256 _age) public {
        students[msg.sender] = Student(_name, _age, true);
    }

    // 4. Get student info
    function getStudent(address _studentAddr) public view returns (string memory, uint256, bool) {
        Student memory s = students[_studentAddr];
        return (s.name, s.age, s.enrolled);
    }

    // 5. Update student age
    function updateAge(uint256 _newAge) public {
        students[msg.sender].age = _newAge;
    }

    // 6. Unenroll student
    function unenroll() public {
        students[msg.sender].enrolled = false;
    }
}
