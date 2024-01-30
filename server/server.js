require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const CompanyModel = require("./db/company.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/superheroes", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ position: "Superhero" });

    return res.json(employees);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching superheroes" });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  console.log(req.body)
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/employees/position/:position", async (req, res) => {
  const requestedPosition = req.params.position;
  try {
    const employees = await EmployeeModel.find();
    const superheroes = employees.filter(
      (employee) =>
        employee.position.toLowerCase() === requestedPosition.toLowerCase()
    );
    return res.json(superheroes);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching superheroes" });
  }
});

app.get("/api/employees/level/:level", async (req, res) => {
  const requestedLevel = req.params.level;
  try {
    const employees = await EmployeeModel.find();
    const employeesLevel = employees.filter(
      (employee) =>
        employee.level.toLowerCase() === requestedLevel.toLowerCase()
    );
    return res.json(employeesLevel);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching empolyeesLevel" });
  }
});

app.get("/api/employees/search/:search", async (req, res) => {
  const searchQuery = req.params.search;
  try {
    const employees = await EmployeeModel.find({ name: { $regex: searchQuery, $options: "i" } });
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while searching employees" });
  }
});

//----------------------
app.get("/api/companies", async(req, res) =>{
  try{const companies = await CompanyModel.find();
  return res.json(companies);} catch(err){
    return res.status(500).json({error: "An error"});
  }
})
//-----------------------
app.post("/api/companies", async(req, res, next) =>{
  console.log(req.body)
  try{const company = req.body;

  const savedCompany = await CompanyModel.create(company);
  return res.json(savedCompany)} catch(err) {
console.log(err);
res.end();
  }
  
})
//----------------------

app.get("/api/positions", async (req, res) => {
  try {
    const positions = await EmployeeModel.distinct("position");
    return res.json(positions);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching positions" });
  }
});

app.get("/api/levels", async (req, res) => {
  try {
    const levels = await EmployeeModel.distinct("level");
    return res.json(levels);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching levels" });
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/equipments", async (req, res) => {
  const equipment = await EquipmentModel.find();
  return res.json(equipment);
});

app.post("/api/equipments", async (req, res, next) => {
  const equipmentData = req.body;

  try {
    const savedEquipment = await EquipmentModel.create(equipmentData);
    return res.json(savedEquipment);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/equipments/:id", async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);
  return res.json(equipment);
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

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
