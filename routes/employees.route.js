const express = require("express");
const employeesController = require("../controllers/employees.controller");
const verifyToken = require("../middlewares/verifyToken");
const path = require("path");
const router = express.Router();

// Define the route for adding an employee
router.post("/add-employee", verifyToken, employeesController.addEmployee);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("content-Type", "img/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/:employeeId", employeesController.deleteEmployeeById);
router.get("/:userId/employees", employeesController.getEmployeeByUser);
router.patch("/:employeeId", employeesController.updateEmployeeById);
router.get("/:employeeId", employeesController.getSingleEmployeeByUser);

module.exports = router;
