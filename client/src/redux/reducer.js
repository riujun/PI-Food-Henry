import {
  GET_RECIPES,
  GET_RECIPE,
  GET_DIETS,
  POST_DATA,
  FILTER_TYPE_DIETS,
  ORDER_ALFA,
  ORDER_HEAL_SCORE,
  ORDER_CREATE,
  GET_SEARCH_RECIPE,
  CLEAN_DETAIL,
} from "./actions";

const initialState = {
  // cargan todos los datos
  recipes: [],
  recipesInfo: [],

  dataPost: [],

  recipe: {},
  // se cargan los tipos de dietas para la creacion de la receta nueva
  dietas: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipesInfo: action.payload,
        recipes: action.payload,

        // recipes: [...state.recipes, action.payload],
      };
    case GET_SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload,

        // recipes: [...state.recipes, action.payload],
      };

    case FILTER_TYPE_DIETS:
      const valor = state.recipesInfo;
      const recipesDiets = valor.filter((r) => {
        let names = r.diets.map((d) => d.name);

        if (names.includes(action.payload)) {
          return r;
        } else {
          return undefined;
        }
      });
      return {
        ...state,
        recipes:
          action.payload === "default" ? state.recipesInfo : recipesDiets,
      };

    case ORDER_ALFA:
      if (action.payload === "Ascendiente_alfa")
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => a.nombre.localeCompare(b.nombre)),
          ],
        };
      else if (action.payload === "Descendiente_alfa")
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => b.nombre.localeCompare(a.nombre)),
          ],
        };

    case ORDER_HEAL_SCORE:
      if (action.payload === "Ascendiente_nivelSaludable")
        return {
          ...state,
          recipes: [
            ...state.recipes.sort(
              (a, b) => a.nivelSaludable - b.nivelSaludable
            ),
          ],
        };
      else if (action.payload === "Descendiente_nivelSaludable")
        return {
          ...state,
          recipes: [
            ...state.recipes.sort(
              (a, b) => b.nivelSaludable - a.nivelSaludable
            ),
          ],
        };

    case ORDER_CREATE:
      if (action.payload === "All")
        return {
          ...state,
          recipes: [...state.recipesInfo],
        };
      else if (action.payload === "create")
        return {
          ...state,
          recipes: [
            ...state.recipesInfo.filter((recipe) => recipe.create === true),
          ],
        };

    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        recipe: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        dietas: action.payload,
      };
    case POST_DATA:
      // const [nombre] = action.payload;
      // const results = state.recipesInfo.map((r) => {
      //   const resultado = r.nombre === nombre;
      //   if (resultado) {
      //     return alert("nombre de la receta ya esta en uso");
      // } else {
      return {
        ...state,
        dataPost: action.payload,
      };
    // }
    // });
    // return {
    //   ...state,
    //   dataPost: results,
    // };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
