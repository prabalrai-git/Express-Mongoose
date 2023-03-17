const express = require("express");
const {
  getAllEmployees,
  addNewEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} = require("../Controllers/Employees-controller");

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", addNewEmployee);
router.delete("/:id", deleteEmployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);

module.exports = router;
