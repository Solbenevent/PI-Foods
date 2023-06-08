// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.
//require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const API_KEY1 = process.env.API_KEY1;
const { Op } = require("sequelize");
const { getAllInfo, getDBInfo } = require("../controllers/getAllRecipes");


const getApiByName = async (name) => {
           
    try{
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=1&apiKey=${API_KEY1}`);
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

const getDBByName = async (name) => {
    try{
        const DBInfo = await getDBInfo();
        const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));
       
        return filtByName;
    }catch (error) {
        return ('error')
    } 
}

const getInfoByName = async (name) => {
    try{
        const apiByName = await getApiByName(name)
        const DBByName = await getDBByName(name)
        const infoTotal = apiByName.concat(DBByName)
        return infoTotal
    }catch (error) {
        return ('error')
    }
}   

const completeInfo = async (req, res) => {
    const { name } = req.query;
    if(name) {
        const infoByName = await getInfoByName(name);
        if(infoByName) {
            res.status(200).json(infoByName)
        } else {
            res.status(404).send("Not found")
        }
    } else {
        const allInfo = await getAllInfo()
        if(allInfo) {
            res.json(allInfo);
        } else {
            res.status(404).json({ message: "Error"})
        }
    }
}



module.exports = {
    getInfoByName,
    completeInfo,
}