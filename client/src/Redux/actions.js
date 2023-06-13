import axios from "axios";
 export const GET_RECIPES = "GET_RECIPES";
export const SET_RECIPES = "SET_RECIPES";
export const DETAIL_RECIPE = "DETAIL_RECIPE";
export const CLEAR_DETAIL = "CLEAR_DETAIL"

 export const getRecipes = () => {
    const ENDPOINT = "http://localhost:3001/recipes";
    return async (dispatch) => {
        try {
            const { data } = await axios(ENDPOINT);
        
            if(data){
                console.log(data);
                return dispatch({
                    type: GET_RECIPES,
                    payload: data
                })
            }
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
        }
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