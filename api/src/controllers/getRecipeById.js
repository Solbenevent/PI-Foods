


const { Recipe, Diet } = require("../db");
require("dotenv").config();
const  API_KEY4  = process.env.API_KEY4; 
const axios = require("axios");
//const response = require("../../apiResults");
const { v4: uuidv4 } = require('uuid');


const getIdRecipesApi = async (id) => {
    const response = await axios(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY4}`);
    const recipes = response.data;
    if (recipes) {
        const diets = recipes.diets ? recipes.diets.map(dieta => dieta) : [];
         //const analyzedInstruction = recipes.analyzedInstructions ? recipes.analyzedInstructions.map((instruction) => instruction.steps) : [];
         let analyzedInstructions = [];
         if(recipes.analyzedInstructions) {
         analyzedInstructions = recipes.analyzedInstructions.flatMap(group => group.steps).map(step => ({
         number: step.number,
         step: step.step
    }))
    }
    return {
        id: recipes.id,
        name: recipes.title,
        image: recipes.image,
        vegetarian: recipes.vegetarian,
        vegan: recipes.vegan,
        glutenFree: recipes.glutenFree,
        summary: recipes.summary,
        healthScore: recipes.healthScore,
        instructions: recipes.instructions,
                        //analyzedInstruction,
        steps: analyzedInstructions,
        diets,
    }
}
}

const getIdDB = async (id) => {
    const recipeID = await Recipe.findByPk(id, {
        include: [
            {
                model: Diet,
                as: "diets",
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        ]
    });
        if(recipeID) return recipeID.toJSON();
}

const getRecipesByIds = async (id) => {
    try {
        if(!isNaN(id)) {
            const recipeId = await getIdRecipesApi(id);
            return recipeId;
        } else {
            const recipeId = await getIdDB(id);
            return recipeId;
        }
    } catch (error) {
        console.log(error);
    }
}

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipeId = await getRecipesByIds(id);
        if(!recipeId) throw Error("Recipe not found");
        return res.status(200).json(recipeId);
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
}

module.exports = {
    getRecipeById   
}
 

module.exports = {
    getRecipeById   
}