const express = require("express");
const {
  getAllEmployees,
  addNewEmployee,
  deleteEmployee,
  getEmployee,
} = require("../Controllers/Employees-controller");

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", addNewEmployee);
router.delete("/:id", deleteEmployee);
router.get("/:id", getEmployee);

module.exports = router;
