const { Router } = require("express");

const recipesRouter = Router();

const {
  getRecipeHandler,
  getRecipesHandler,
  createRecipeHandler,
} = require("../handler/recipesHandler");

const validate = (req, res, next) => {
  const { nombre, resumenPlato, nivelSaludable, pasoApaso, imagen, dietas } =
    req.body;
  if (
    !nombre ||
    nombre === "" ||
    !resumenPlato ||
    resumenPlato === "" ||
    !nivelSaludable ||
    nivelSaludable === 0 ||
    !pasoApaso ||
    pasoApaso === "" ||
    !imagen ||
    imagen === "" ||
    !dietas
  )
    res.status(400).json({ error: "Missing data" });

  next();
  // avanzar la requets
};
const validateIDDetail = (req, res, next) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: "Missing data" });

  next();
};

recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", validateIDDetail, getRecipeHandler);

recipesRouter.post("/", validate, createRecipeHandler);

module.exports = recipesRouter;
