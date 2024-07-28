# Employee Management System

This is an Employee Management System that allows you to update employee information, including uploading images.

## Features

- Update employee information
- Upload and update employee images

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for file uploads)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/employee-management-system.git
   cd employee-management-system

2 . Install the dependencies:

    npm install

3.Create a .env file in the root directory and add your MongoDB connection string:

    MONGO_URI=your_mongodb_connection_string

4. Set up the file upload directory:

    mkdir uploads

### Running the Application

### 1. Start the server: ### 
     npm run dev

2. The server will run on http://localhost:4000.

## API Endpoints ##
### Update Employee ###
    URL: PATCH /employees/:employeeId

    Description: Update an employee's information, including uploading an image.

### Request Parameters: ###

    employeeId (URL parameter): The ID of the employee to update.

    Request Body:
    name (string): The name of the employee.
    email (string): The email of the employee.
    mobile (string): The mobile number of the employee.
    designation (string): The designation of the employee.
    gender (string): The gender of the employee.
    course (array): An array of courses.
    image (file): An optional image file of the employee.

### Response: ###

    200 OK: The employee information was updated successfully.
    500 Internal Server Error: An error occurred while updating the employee.






