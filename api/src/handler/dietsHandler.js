const { dietsInfo } = require("../controllers/dietsController");

const getDietsHandler = async (req, res) => {
  try {
    const dataDiets = await dietsInfo();
    res.status(200).json(dataDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
};
