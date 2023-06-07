// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.
const { Recipe, Diet } = require("../db");
const  axios = require("axios");
require("dotenv").config();
const {API_KEY} = process.env.API_KEY;
const { Op } = require("sequelize");


const getApiByName = async (name) => {
           
    try{
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&addRecipeInformation=true%number=1&apiKey=${API_KEY}
        `);
        const { results } = resAxios.data;
        if(results.length > 0){
            let response = results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    idApi: result.id, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    summary:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }
            })
      return response           
    }

    else{
        console.log("NO hay coincidencia en la API");
        //return ('error');
    }

    }catch (error) {
        console.error(error);
        return ('error')
    }
}

// const DBbyName = async (name) =>{
//     try {
//         const DBdata = await getDBinfo();
//         const filtName = DBdata.filter(recipe => recipe.name.includes(name));

//         return filtName
//     } catch(error){
//         return console.log(error);
//     }
// }
module.exports = {getApiByName};