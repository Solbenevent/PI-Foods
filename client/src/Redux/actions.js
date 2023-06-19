import axios from "axios";
 export const GET_RECIPES = "GET_RECIPES";
export const SET_RECIPES = "SET_RECIPES";
export const DETAIL_RECIPE = "DETAIL_RECIPE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS ="GET_DIETS";
export const FILTER_DIETS = "FILTER_DIETS";



export const setRecipes = (recipes) => {
  return {
    type: SET_RECIPES,
    recipes: recipes,
  }
}

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







