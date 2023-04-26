// export const DELETE_FAVORITO = "DELETE_FAVORITO";
// export const FILTER = "FILTER";
// export const ORDER = "ORDER";
import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_SEARCH_RECIPE = "GET_SEARCH_RECIPE";

export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_DATA = "POST_DATA";
export const FILTER_TYPE_DIETS = "FILTER_TYPE_DIETS";
export const ORDER_ALFA = "ORDER_ALFA";
export const ORDER_HEAL_SCORE = "ORDER_ALFA";
export const ORDER_CREATE = "ORDER_CREATE";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

export const getAllRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/recipes");

    const apiRecipe = apiData.data;
    // console.log(apiData);
    dispatch({ type: GET_RECIPES, payload: apiRecipe });
  };
};
export const getSearchRecipe = (name) => {
  return async function (dispatch) {
    try {
      if (name === "") {
        console.log("hola estoy en name malo");
        const apiDataRecipes = await axios.get(
          `http://localhost:3001/recipes?name=${name}`
        );
        const recipes = apiDataRecipes.data;
        dispatch({ type: GET_SEARCH_RECIPE, payload: recipes });
      } else {
        console.log("hola estoy en name");
        const apiDataRecipes = await axios.get(
          `http://localhost:3001/recipes?name=${name}`
        );
        const recipes = apiDataRecipes.data;
        dispatch({ type: GET_SEARCH_RECIPE, payload: recipes });
      }
    } catch (error) {
      alert("Enter a valid recipe name with a minimum of 5 characters.");
    }
  };
};

export const getDetaillRecipe = (id) => {
  return async function (dispatch) {
    const apiDataRecipe = await axios.get(
      `http://localhost:3001/recipes/${id}`
    );
    const detailRecipe = apiDataRecipe.data;
    dispatch({ type: GET_RECIPE, payload: detailRecipe });
  };
};

export const cleanDetail = () => {
  const valor = {};
  return {
    type: CLEAN_DETAIL,
    payload: valor,
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const apiDataDiets = await axios.get(`http://localhost:3001/diets`);
    const getDiets = apiDataDiets.data;
    dispatch({ type: GET_DIETS, payload: getDiets });
  };
};

export const postData = (data) => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/recipes", data);
  // console.log(data);
  // console.log(response);

  dispatch({
    type: POST_DATA,
    payload: response.data,
  });
};

export const filterCardsTypyDiets = (typeDiets) => {
  // console.log(typeDiets);
  return {
    type: FILTER_TYPE_DIETS,
    payload: typeDiets,
  };
};
export const orderCardsAlfa = (nombre) => {
  return {
    type: ORDER_ALFA,
    payload: nombre,
  };
};
export const orderCardsHealScore = (nombre) => {
  return {
    type: ORDER_HEAL_SCORE,
    payload: nombre,
  };
};
export const orderCardsCreateR = (nombre) => {
  return {
    type: ORDER_CREATE,
    payload: nombre,
  };
};

// export const orderCards = (id) => {
//   return {
//     type: ORDER,
//     payload: id,
//   };
// };
