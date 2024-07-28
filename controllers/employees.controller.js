const fs = require("fs");
const multer = require("multer");
const Employees = require("../models/Employees");
const User = require("../models/user");
const path = require("path");
const Employee = require("../models/Employees");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
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

const getEmployeeByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    const userName = user.username;
    const employees = await Employees.find({ user: userId });

    res.status(200).json({ userName, employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleEmployeeByUser = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await Employees.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "No employee found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { name, email, mobile, designation, gender, course };
    if (image) {
      updateData.image = image;
    }

    const updateEmployee = await Employees.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true }
    );

    res.status(200).json(updateEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  addEmployee: [upload.single("image"), addEmployee],
  deleteEmployeeById,
  getEmployeeByUser,
  updateEmployeeById: [upload.single("image"), updateEmployeeById],
  getSingleEmployeeByUser,
};
