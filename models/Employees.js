const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  course: {
    type: [String],
    enum: ["MCA", "BCA", "BSC"],
  },
  image: {
    type: String,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Model name must match
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
