/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./name.json");
const CompanyModel = require("../db/company.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}


const populateCompanies = async () => {
  await CompanyModel.deleteMany({});

  const companies = names.map((name) => ({
    name,

  }));

  await CompanyModel.create(...companies);
  console.log("Companies created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateCompanies();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
