import { GET_RECIPES, DETAIL_RECIPE, CLEAR_DETAIL, GET_DIETS, FILTER_BY_DIETS, ORDER_ALPHABETIC, ORDER_HEALTHSCORE, FILTER_BY_ORIGIN, GET_RECIPE_NAME, DELETE_FILTERS } from "./actions";

const initialState = {
    recipes: [],
    detailRecipes: {},
    diets: [], 
   
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
        recipes: payload
      }    
    // case SET_RECIPES:
    //     return {
    //         ...state,
    //         recipes: [...state.recipes, ...recipes],
    //     }   
    case DETAIL_RECIPE:
        return {
            ...state,
            detailRecipes: payload
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
                ? state.recipes.sort((a, b) => a.name.localeCompare(b.title))
                : state.recipes.sort((a, b) => b.name.localeCompare(a.title)),
          };
    case ORDER_HEALTHSCORE:
        return {
            ...state,
            recipes:
              payload === "Ascendente"
                ? state.recipes.sort((a, b) => (a.healthScore < b.healthScore ? -1 : 1))
                : state.recipes.sort((a, b) => (a.healthScore > b.healthScore ? -1 : 1)),
          };
    // case FILTER_BY_ORIGIN:
    //     const filtered = state.recipes.filter((recipe) => {
    //         const regExp = /^[0-9]+$/;
    //         if (payload === 'Api' && regExp.test(recipe.id)) {
    //           return true;
    //         } else if (payload === 'DataBase' && !regExp.test(recipe.id)) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       })
    //       return {
    //         ...state,
    //         recipes: filtered
    //       }
    // Reducer
case FILTER_BY_ORIGIN:
  //const { payload } = action; // Obtén el valor del origen de la acción
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
        break;
  }
}

export default reducer;
