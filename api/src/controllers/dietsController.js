const dietsData = require("../dbDiets.js");
const { Diets } = require("../db");

const dietsInfo = async () => {
  const inf = await Diets.findOne().then((data) => {
    if (data) {
      return Diets.findAll();
    } else {
      return Diets.bulkCreate(dietsData);
    }
  });

  return inf;
};

module.exports = {
  dietsInfo,
};
