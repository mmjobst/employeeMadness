require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());



const  employeeRouter = require("./routes/employeeRouter");
app.use("/api/employees",  employeeRouter);

const equipmentRouter = require("./routes/equipmentRouter");
app.use("/api/equipment", equipmentRouter);

const robertRouter = require("./routes/robertRouter");
app.use("/api/robert", robertRouter);



const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
