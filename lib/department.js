class Department {
    // Create Department class
    constructor(departmentName) {
        this.departmentName = departmentName;
    }
    // Class functions
    getDepartment() {
        return this.departmentName;
    }
}

// export Employee
module.exports = Department;