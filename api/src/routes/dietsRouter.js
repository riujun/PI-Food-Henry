const { Router } = require("express");

const dietsRouter = Router();
const { getDietsHandler } = require("../handler/dietsHandler");

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
