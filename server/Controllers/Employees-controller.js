const Employees = require("../Models/Employees");

const getAllEmployees = async (req, res, next) => {
  let employees;

  try {
    employees = await Employees.find();
  } catch (error) {
    return console.log(error);
  }

  return res.status(200).json({ employees });
};
const getEmployee = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await Employees.findById(id);

    if (!result) {
      res.status(404).json({ msg: "No record with the given id" });
    } else {
      res.status(201).json({ employee: result });
    }
  } catch (error) {
    return console.log(error);
  }
};

const addNewEmployee = async (req, res, next) => {
  const { name, position, address, email } = req.body;

  let existingEmployee;

  try {
    existingEmployee = await Employees.findOne({ name });
  } catch (error) {
    return console.log(error);
  }
  if (existingEmployee) {
    return res.status(400).json({ msg: "employee already added" });
  }
  const employee = new Employees({
    name,
    position,
    address,
    email,
  });
  try {
    await employee.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ msg: "new employee added successfully" });
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Employees.findByIdAndRemove(id);
    if (!result) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.json({ message: "Record deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body);
  try {
    const result = await Employees.findById(id);
    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }
    result.name = req.body.name;
    result.position = req.body.position;
    result.email = req.body.email;
    result.address = req.body.address;
    const updatedUser = await result.save();
    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating user" });
  }
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
};
