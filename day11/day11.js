// Day 11 Interactive Practical: Arrays and Objects
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let users = [];

// Functions
function addUser(name, age, email) {
    users.push({ name, age, email });
    console.log(`\n${name} has been added.\n`);
    mainMenu();
}

function viewUsers() {
    if (users.length === 0) {
        console.log("\nNo users available.\n");
    } else {
        console.log("\nAll Users:");
        users.forEach((user, i) => {
            console.log(`${i + 1}. Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`);
        });
        console.log("");
    }
    mainMenu();
}

function updateUser(name, newAge, newEmail) {
    let user = users.find(user => user.name === name);
    if (user) {
        user.age = newAge;
        user.email = newEmail;
        console.log(`\n${name} has been updated.\n`);
    } else {
        console.log(`\n${name} not found.\n`);
    }
    mainMenu();
}

function deleteUser(name) {
    let initialLength = users.length;
    users = users.filter(user => user.name !== name);
    if (users.length < initialLength) {
        console.log(`\n${name} has been deleted.\n`);
    } else {
        console.log(`\n${name} not found.\n`);
    }
    mainMenu();
}

function findUser(name) {
    let user = users.find(user => user.name === name);
    if (user) {
        console.log(`\nUser Found: Name: ${user.name}, Age: ${user.age}, Email: ${user.email}\n`);
    } else {
        console.log(`\n${name} not found.\n`);
    }
    mainMenu();
}

// Main Menu
function mainMenu() {
    console.log("Choose an option:");
    console.log("1. Add User");
    console.log("2. View Users");
    console.log("3. Update User");
    console.log("4. Delete User");
    console.log("5. Find User");
    console.log("6. Exit\n");

    rl.question("Enter choice: ", function(choice) {
        switch(choice) {
            case "1":
                rl.question("Enter name: ", name => {
                    rl.question("Enter age: ", age => {
                        rl.question("Enter email: ", email => {
                            addUser(name, parseInt(age), email);
                        });
                    });
                });
                break;
            case "2":
                viewUsers();
                break;
            case "3":
                rl.question("Enter name of user to update: ", name => {
                    rl.question("Enter new age: ", age => {
                        rl.question("Enter new email: ", email => {
                            updateUser(name, parseInt(age), email);
                        });
                    });
                });
                break;
            case "4":
                rl.question("Enter name of user to delete: ", name => {
                    deleteUser(name);
                });
                break;
            case "5":
                rl.question("Enter name of user to find: ", name => {
                    findUser(name);
                });
                break;
            case "6":
                console.log("Exiting...");
                rl.close();
                break;
            default:
                console.log("\nInvalid choice. Try again.\n");
                mainMenu();
        }
    });
}

// Start Program
console.log("=== Welcome to User Management System ===\n");
mainMenu();
