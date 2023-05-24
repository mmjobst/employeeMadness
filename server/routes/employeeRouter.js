const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");

router.use("/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});


const filterEmployees = async (filterBy, filterValue) => {
    return  await EmployeeModel.find({ [filterBy]: {'$regex' : `^${filterValue}`, $options : 'i'}})
}

const sortEmployees = async (sortBy) => {
  return await EmployeeModel.find({}).sort({[sortBy]: 1});
}


router.get("/", async (req, res) => {
  const sortBy = (req.query.sort) ?  (req.query.sort).toLowerCase() : "undefined";
  const filterValue = (req.query.filter) ? (req.query.filter) : "undefined";
  const filterByLevel = await filterEmployees("level", filterValue)
  const filterByPosition = await filterEmployees("position", filterValue)
  const sorted = await sortEmployees(sortBy);

  filterValue === "undefined" ? res.json(sorted) : filterByLevel.length > 0 ? res.json(filterByLevel): res.json(filterByPosition)
});


router.get("/:id", (req, res) => {
  return res.json(req.employee);
})


router.post("/", async (req, res, next) => {
  const employee = req.body
  
  
  try {
    const saved = await EmployeeModel.create(employee);
    console.log(saved)
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});


router.patch("/:id", async (req, res, next) => {
  let employee = req.body;
  const equipment = await EquipmentModel.find({ name: employee.equipment})
  employee.equipment = equipment[0];
  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});



router.delete("/:id", async (req, res, next) => {
  
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
