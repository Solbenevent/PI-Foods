const axios = require("axios");
require("dotenv").config();
const API_KEY4 = process.env.API_KEY4;
const { Recipe, Diet } = require("../db");

const getInfofromApi = async () => {
  try {
    const response = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`
    );
    const { results } = response.data;
    if (results) {
      let cleanData = results?.map(recipe => {
        return {
          name: recipe.title,
          image: recipe.image,
          summary: recipe.summary,
          vegetarian: recipe.vegetarian,
          glutenFree: recipe.glutenFree,
          id: recipe.id,
          score: recipe.spoonacularScore,
          healthScore: recipe.healthScore,
          types: recipe.dishTypes?.map(type => type),
          diets: recipe.diets?.map(diet => diet),
          steps: recipe.analyzedInstructions[0]?.steps?.map(item => item.step) || [],
          created: false,
        };
      });
      return cleanData;
    } else {
      throw Error("Error fetching recipes from api");
    }
  } catch (error) {
    return [];
  }
};


const loadRecipesToDB = async (recipes) => {
  try {
    const existingRecipes = await Recipe.findAll({ include: Diet }); // Incluir las dietas asociadas a cada receta existente
    const existingRecipeIds = existingRecipes.map(recipe => recipe.id);
    const newRecipes = recipes.filter(recipe => !existingRecipeIds.includes(recipe.id));

    for (const recipe of newRecipes) {
      const { id, name, image, summary, healthScore, steps, diets } = recipe;

      const createdRecipe = await Recipe.create({
        id,
        name,
        image,
        summary,
        healthScore,
        steps
      });

      const dietDB = await Diet.findAll({
        where: { name: diets }
      });

      await createdRecipe.addDiet(dietDB); // Asociar las dietas a la receta creada
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error loading recipes from DB");
  }
}




const fetchAndSaveRecipes = async (req, res) => {
  try {
    const recipesFromApi = await getInfofromApi();
    const recipesFromDB = await Recipe.findAll({ include: Diet });
    const newRecipes = recipesFromApi.filter(apiRecipe => !recipesFromDB.some(dbRecipe => dbRecipe.id === apiRecipe.id));

    const allRecipes = [...newRecipes, ...recipesFromDB]
    await loadRecipesToDB(allRecipes);
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error al cargar todas las recetas" + "" + error }); 
  }
}

module.exports = {

   fetchAndSaveRecipes
}




