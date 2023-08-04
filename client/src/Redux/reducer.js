import { GET_RECIPES, DETAIL_RECIPE, CLEAR_DETAIL, GET_DIETS, CREATE_RECIPE, FILTER_BY_DIETS, ORDER_ALPHABETIC, ORDER_HEALTHSCORE, FILTER_BY_ORIGIN, GET_RECIPE_NAME, DELETE_FILTERS } from "./actions";

const initialState = {
    recipes: [],
    detailRecipes: {},
    diets: [], 
    filteredRecipes: [],
   
}

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_RECIPES:
        return {
            ...state,
            recipes: payload
        }
    case GET_RECIPE_NAME:
      return {
        ...state,
       filteredRecipes: payload
      }    
    case CREATE_RECIPE:
      return{
        ...state,
        recipes: payload
      } 
    // case DETAIL_RECIPE:
    //     return {
    
    case DETAIL_RECIPE:
      return {
        ...state,
        detailRecipes: payload,
      }
    case CLEAR_DETAIL:
        return {
            ...state,
            detailRecipes: {}
        } 
    case GET_DIETS:
        return {
            ...state,
            diets: payload
        }
    case FILTER_BY_DIETS:
        const allRecipesFiltered = state.recipes.filter(
            (recipe) => recipe.diets.includes(payload)
          );
          return {
            ...state,
            recipes: allRecipesFiltered,
          };   
    case ORDER_ALPHABETIC:
        return {
            ...state,
            recipes:
              payload === "A-Z"
                ? state.recipes.sort((a, b) => a.name.localeCompare(b.name))
                : state.recipes.sort((a, b) => b.name.localeCompare(a.name)),
          };
    case ORDER_HEALTHSCORE:
        return {
            ...state,
            recipes:
              payload === "Ascendente"
                ? state.recipes.sort((a, b) => (a.healthScore < b.healthScore ? -1 : 1))
                : state.recipes.sort((a, b) => (a.healthScore > b.healthScore ? -1 : 1)),
          };

case FILTER_BY_ORIGIN:
  const filteredRecipes = state.recipes.filter((recipe) => {
    const regExp = /^[0-9]+$/;
    if (payload === 'Api' && regExp.test(recipe.id)) {
      return true;
    } else if (payload === 'DataBase' && !regExp.test(recipe.id)) {
      return true;
    } else if (payload === 'All') {
      return true;
    }
    return false;
  });

  return {
    ...state,
    recipes: filteredRecipes,
  };

    case DELETE_FILTERS:
        return {
          ...state,
          recipes: state.recipes
        }                     

    default:
        return {
            ...state
        }
      
  }
}

export default reducer;
