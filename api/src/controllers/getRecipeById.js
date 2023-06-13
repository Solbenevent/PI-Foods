// Peticiones por ID
// https://api.spoonacular.com/recipes/{id}/information?includeNutrition=true&apiKey={tuAPIKEY}
// 📍 GET | /recipes/:idRecipe
// Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
// La receta es recibida por parámetro (ID).
// Tiene que incluir los datos de los tipos de dietas asociados a la receta.
// Debe funcionar tanto para las recetas de la API como para las de la base de datos.
const { Recipe, Diet } = require("../db");
require("dotenv").config();
const  API_KEY  = process.env.API_KEY; 
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        let recipes;
        if(id){
            const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
            const response = await axios.get(url);
            recipes = response.data;
        } else {
            const uuidRecipe = uuidv4();
            recipes = await Recipe.findByPk(uuidRecipe, {
                include: Diet
            });
        } 
        if(recipes) {
            const diets = recipes.diets ? recipes.diets.map(dieta => dieta) : [];
            const analyzedInstruction = recipes.analyzedInstructions ? recipes.analyzedInstructions.map((instruction) => instruction.steps) : [];
            res.status(200).json({
                id: recipes.id,
                name: recipes.title,
                image: recipes.image,
                vegetarian: recipes.vegetarian,
                vegan: recipes.vegan,
                glutenFree: recipes.glutenFree,
                summary: recipes.summary,
                healthScore: recipes.healthScore,
                instructions: recipes.instructions,
                analyzedInstruction,
                diets,
            });
        } else {
            res.status(404).send("Recipe not found")
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// const getRecipeByIdDB = async (id) => {
//   const recipeDB = await Recipe.findByPk(id, {
//     include: [
//         {
//             model: Diet,
//             attributes: ["name"],
//             through: {
//                 attributes: [],
//             }
//         }
//     ]
//   });
//   return recipeDB
// }

// const getRecipeByIdApi = async (id) => {
//     const recipeAPi = await axios(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)

//     if(recipeAPi) {
//         const diets = recipeAPi.diets ? recipeAPi.diets.map(dieta => dieta) : []; 
//         const analyzedInstruction = recipeAPi.analyzedInstructions ? recipeAPi.analyzedInstructions.map((instruction) => instruction.steps) : [];
//         return {
//             id: recipeAPi.id,
//             name: recipeAPi.title,
//             image: recipeAPi.image,
//             vegetarian: recipeAPi.vegetarian,
//             vegan: recipeAPi.vegan,
//             glutenFree: recipeAPi.glutenFree,
//             summary: recipeAPi.summary,
//             healthScore: recipeAPi.healthScore,
//             instructions: recipeAPi.instructions,
//             analyzedInstruction,
//             diets,
//         }
//     }
// }

// const getRecipesById = async (id) => {
//     // const { id } = req.params; 
//     // try {
//     //     if(!isNaN(id)) {
//     //         const recipeId = await getRecipeByIdApi(id)
//     //         return res.status(200).json(recipeId)
//     //     } else {
//     //         const recipeId = await getRecipeByIdDB(id);
//     //         return res.status(200).json(recipeId)
//     //     }
//     // } catch (error) {
//     //     return res.status(500).send(error)
//     // }
//     if(!isNaN(id)) {
//         const recipeId = await getRecipeByIdApi(id);
//         return recipeId;
//     } else {
//         const RecipeId = await getRecipeByIdDB(id);
//         return RecipeId;
//     }
// }


// const getAllRecipesById = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const recipeId = await getRecipesById(id)
//         if(!recipeId) throw Error("error catching recipe")
//         return res.status(200).json(recipeId)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }


module.exports = {
    getRecipeById   
}