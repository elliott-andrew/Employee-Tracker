class Employee {
    // Create Employee class
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // Class functions
    getFullName() {
        return (this.firstName + this.lastName);
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
}

// export Employee
module.exports = Employee;