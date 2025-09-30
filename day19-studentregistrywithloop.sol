// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryWithLoop {
    // Struct to hold student details
    struct Student {
        string name;
        uint256 age;
        bool enrolled;
    }

    // Mapping: address => Student
    mapping(address => Student) public students;

    // Array to keep track of all student addresses
    address[] public studentAddresses;

    // Register a student
    function registerStudent(string memory _name, uint256 _age) public {
        // If it's a new student, push address into the array
        if (bytes(students[msg.sender].name).length == 0) {
            studentAddresses.push(msg.sender);
        }

        students[msg.sender] = Student(_name, _age, true);
    }

    // Get student info by address
    function getStudent(address _studentAddr) public view returns (string memory, uint256, bool) {
        Student memory s = students[_studentAddr];
        return (s.name, s.age, s.enrolled);
    }

    // Update student age
    function updateAge(uint256 _newAge) public {
        students[msg.sender].age = _newAge;
    }

    // Unenroll a student
    function unenroll() public {
        students[msg.sender].enrolled = false;
    }

    // Return total number of registered students
    function totalStudents() public view returns (uint256) {
        return studentAddresses.length;
    }

    // Return all students (loop)
    function getAllStudents() public view returns (Student[] memory) {
        Student[] memory all = new Student[](studentAddresses.length);
        for (uint256 i = 0; i < studentAddresses.length; i++) {
            all[i] = students[studentAddresses[i]];
        }
        return all;
    }
}
