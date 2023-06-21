import axios from "axios";
 export const GET_RECIPES = "GET_RECIPES";
export const SET_RECIPES = "SET_RECIPES";
export const DETAIL_RECIPE = "DETAIL_RECIPE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS ="GET_DIETS";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_ALPHABETIC = "ORDER_ALPHABETIC";
export const ORDER_HEALTHSCORE = "ORDER_HEALTHSCORE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const DELETE_FILTERS = "DELETE_FILTERS"; 




// export const setRecipes = (recipes) => {
//   return {
//     type: SET_RECIPES,
//     recipes: recipes,
//   }
// }

 export const getRecipes = () => {
    const ENDPOINT = "http://localhost:3001/recipes";
    return async (dispatch) => {
        try {
            const { data } = await axios(ENDPOINT);
        
            if(data){
                
                return dispatch({
                    type: GET_RECIPES,
                    payload: data
                })}
        } catch (error) {
            throw Error("Error catching recipes")
        }
    }
}

export const getRecipeName =  (name) => {
  const ENDPOINT = `http://localhost:3001/recipes/name?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(ENDPOINT);
      if(data) {
        return dispatch({
          type: GET_RECIPE_NAME,
          payload: data
        })
      }
    } catch (error) {
      alert("Recipe not found");
    }
  }
}
 


export const detailRecipe = (id) => {
    const ENDPOINT = `http://localhost:3001/recipes/${id}`;
    return async (dispatch) => {
      try {
        const { data } = await axios.get(ENDPOINT); // Agregar 'await' aquí
        if (data) {
          return dispatch({
            type: DETAIL_RECIPE,
            payload: data,
          });
        }console.log(data);
      } catch (error) {
        throw Error("Error catching detail");
      }
    };
  };
  

export const clearDetail = () => {
   return {
    type: CLEAR_DETAIL,
   }
}

export const createRecipe = (recipeData) => {
  return async (dispatch) => {
    try {
      const { data } =  await axios.post("http://localhost:3001/recipes", recipeData)
      if(data) {
        return dispatch({
          type: CREATE_RECIPE,
          payload: data
        })
      } else throw Error("Can't create recipe")
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDiets = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/diets");
      if(data) {
        return dispatch({
          type: GET_DIETS,
          payload: data
        })
      } else throw Error("error catching diets")
    } catch (error) {
      console.log(error);
    }
  }
}

export const filterByDiets = (diet) => {
  return {
    type: FILTER_BY_DIETS,
    payload: diet,
  };
}

export const orderAlphabetic = (option) => {
  return {
    type: ORDER_ALPHABETIC,
    payload: option,
  };
}

export const orderByHealthScore = (score) => {
  return {
    type: ORDER_HEALTHSCORE,
    payload: score,
  };
}

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export const deleteFilters = () => {
  return {
    type: DELETE_FILTERS,
  }
}











