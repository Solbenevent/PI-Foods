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
    const { idRecipe } = req.params;
    try {
        let recipes;
        if(idRecipe){
            const url = `https://api.spoonacular.com/recipes/${idRecipe}/information?includeNutrition=true&apiKey=${API_KEY}`
            const response = await axios.get(url);
            recipes = response.data;
        } else {
            const uuidRecipe = uuidv4();
            recipes = await Recipe.findByPk(uuidRecipe, {
                include: Diet
            });
        } 
        if(recipes) {
            const diet = recipes.diets ? recipes.diets.map(dieta => dieta) : [];
            const analyzedInstruction = recipes.analyzedInstructions ? recipes.analyzedInstructions.map((instruction) => instruction.steps) : [];
            res.status(200).json({
                name: recipes.title,
                image: recipes.image,
                vegetarian: recipes.vegetarian,
                vegan: recipes.vegan,
                glutenFree: recipes.glutenFree,
                summary: recipes.summary,
                healthScore: recipes.healthScore,
                instructions: recipes.instructions,
                analyzedInstruction,
                diet,
            });
        } else {
            res.status(404).send("Recipe not found")
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getRecipeById,
}