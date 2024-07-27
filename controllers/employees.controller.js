const fs = require("fs");
const multer = require("multer");
const Employees = require("../models/Employees");
const User = require("../models/user");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    // Log the request body to debug
    console.log("Request body:", req.body);

    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const employee = new Employees({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
      user: user._id,
    });

    const savedEmployees = await employee.save();

    user.employees.push(savedEmployees);

    await user.save();

    return res.status(200).json({ message: "Employee added" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).send("Internal server error");
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const deleteEmployee = await Employees.findByIdAndDelete(employeeId);

    if (!deleteEmployee) {
      return res.status(404).json({ error: "No Employee found" });
    }

    res.status(200).send("Deleted Employee");

  } catch (error) {
    console.error("Error delete employee:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  addEmployee: [upload.single("image"), addEmployee],
  deleteEmployeeById,
};
