const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");

const cleanArrayRutaPrincipal = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      nombre: elem.title,
      imagen: elem.image,
      nivelSaludable: elem.healthScore,

      diets: elem.diets.map((d) => {
        return {
          name: d,
        };
      }),
      create: false,
    };
  });

const cleanArrayDetalleRecipe = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      nombre: elem.title,
      imagen: elem.image,
      tipoPlato: elem.dishTypes,
      diets: elem.diets,
      resumenPlato: elem.summary,
      nivelSaludable: elem.healthScore,

      pasoApaso: elem.analyzedInstructions.map((stepss) =>
        stepss.steps.map((sp) => sp.step)
      ),
      create: false,
    };
  });

const searchRecipes = async (name) => {
  if (name.length <= 5)
    throw Error(`necesita un minimo de 5 caracteres realizar la busqueda`);
  const dataBaseRecipes = await Recipe.findAll({
    where: { nombre: { [Op.iLike]: `%${name}%` } },
  });

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const apiRecipes = cleanArrayRutaPrincipal(apiRecipesRaw);
  const filterApi = apiRecipes.filter((recipe) =>
    recipe.nombre.toUpperCase().includes(name.toUpperCase())
  );

  // const filterApi = apiRecipes.filter((recipe) => recipe.nombre.includes(name));

  return [...filterApi, ...dataBaseRecipes];
};

// const filterApi = apiRecipes.filter((recipe) =>
//   recipe.name.toLowerCase().includes(name.toLowerCase())
// );

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name", "id"],
      through: {
        attributes: [],
      },
    },
  });

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const apiRecipes = cleanArrayRutaPrincipal(apiRecipesRaw);

  return [...apiRecipes, ...dataBaseRecipes];
};

const createRecipe = async (
  nombre,
  resumenPlato,
  nivelSaludable,
  pasoApaso,
  imagen
) =>
  await Recipe.create({
    nombre,
    resumenPlato,
    nivelSaludable,
    pasoApaso,
    imagen,
  });

const getAPIRecipeID = async (id) => {
  const apiRecipesRaw = [
    (
      await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
      )
    ).data,
  ];
  const [apiResults] = cleanArrayDetalleRecipe(apiRecipesRaw);
  return apiResults;
};

const getBaseDatosRecipeID = async (id) => {
  const dataBaseRecipes = await Recipe.findByPk(id, {
    include: {
      model: Diets,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return dataBaseRecipes;
};
module.exports = {
  createRecipe,
  getAPIRecipeID,
  searchRecipes,
  getAllRecipes,
  getBaseDatosRecipeID,
};
