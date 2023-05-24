const express = require("express");
const router = express.Router();

const EquipmentModel = require("../db/equipment.model");

const filterEquipment = async (filterFor) => {
  if (isNaN(filterFor)) {
    return await EquipmentModel.find({
      type: { '$regex': `^${filterFor}`, $options: "i" },
    });
  } else {
    return await EquipmentModel.find({ amount: filterFor });
  }
};

const sortEquipment = async (sortBy) => {
  return await EquipmentModel.find({}).sort({ [sortBy]: 1 });
};

router.get("/", async (req, res) => {
  const sortBy = (req.query.sort) ?  (req.query.sort).toLowerCase() : "undefined";
  const filterFor = (req.query.filter) ? (req.query.filter) : "undefined";

  const filtered = await filterEquipment(filterFor);
  const sorted = await sortEquipment(sortBy);

  filterFor === "undefined" ? res.json(sorted) : res.json(filtered);
});

router.get("/:id", async (req, res) => {
  const equipmentId = req.params.id;
  const equipment = await EquipmentModel.find({ _id: equipmentId });
  return res.json(equipment[0]);
});

router.post("/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const equipment = req.body;
  const id = req.body._id;

  try {
    const updated = await EquipmentModel.findByIdAndUpdate(id, {
      name: equipment.name,
      tool: equipment.tool,
      amount: equipment.amount,
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const equipmentId = req.params.id;
  try {
    const deleted = await EquipmentModel.findByIdAndDelete(equipmentId);
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
