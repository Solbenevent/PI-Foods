import { GET_RECIPES, SET_RECIPES, DETAIL_RECIPE, CLEAR_DETAIL } from "./actions";

const initialState = {
    recipes: [],
    detailRecipes: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
        return {
            ...state,
            recipes: action.payload
        }
    case SET_RECIPES:
        return {
            ...state,
            recipes: action.recipes
        }   
    case DETAIL_RECIPE:
        return {
            ...state,
            detailRecipes: action.payload
        }    
    case CLEAR_DETAIL:
        return {
            ...state,
            detailRecipes: {}
        } 
  
    default:
        return {
            ...state
        }
        break;
  }
}

export default reducer;
