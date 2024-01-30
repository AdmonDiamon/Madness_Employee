require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const amountsArray = Array.from({ length: 101 }, (_, index) => index);
const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = [];

  for (const category in names) {
    if (names.hasOwnProperty(category)) {
      const categoryObj = names[category];

      for (const device in categoryObj) {
        if (categoryObj.hasOwnProperty(device)) {
          const types = categoryObj[device];

          types.forEach((type) => {

            const equipmentItem = {
              name: device,
              type: type,
              amount: pick(amountsArray),
            };

            equipment.push(equipmentItem);
          });
        }
      }
    }
  }

  await EquipmentModel.create(equipment);
  console.log("Equipments created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
