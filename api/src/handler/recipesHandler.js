const {
  createRecipe,
  getAPIRecipeID,
  searchRecipes,
  getAllRecipes,
  getBaseDatosRecipeID,
} = require("../controllers/recipesController");

const getRecipesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchRecipes(name) : await getAllRecipes();

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // cuando es con uuid es nan entonces cuando sea nan busque en la base de datos
    const source = isNaN(id)
      ? await getBaseDatosRecipeID(id)
      : await getAPIRecipeID(id);
    // console.log(source);
    res.status(200).json(source);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipeHandler = async (req, res) => {
  try {
    // dietas es un array de id que corresponden al cada id de cada dieta
    const { nombre, resumenPlato, nivelSaludable, pasoApaso, imagen, dietas } =
      req.body;

    const newReceta = await createRecipe(
      nombre,
      resumenPlato,
      nivelSaludable,
      pasoApaso,
      imagen
    );
    // tabla de union  tengo que poder indicar que tipo de dieta es la receta que estoy creando es para crear una realcion en la tabla thor
    await newReceta.addDiets(dietas);
    // console.log(newReceta);
    res.status(201).json("Creado exitosamente");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  createRecipeHandler,
};
