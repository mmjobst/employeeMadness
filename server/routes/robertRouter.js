const express = require("express");
const router = express.Router();

const EmployeeModel = require("../db/employee.model");

router.get("/", async (req, res) => {
      const roberts = await EmployeeModel.find({ name: {'$regex' : 'robert', $options :'i'}});
      return res.json(roberts);
})

module.exports = router;