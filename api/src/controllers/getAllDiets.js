const axios = require("axios");
//require("dotenv").config();
//const API_KEY4 = process.env.API_KEY4;
const { Recipe, Diet } = require("../db");
const results = require("../../apiResults");

const getDietsFromApi = async () => {
    try {
        // const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`);
        // const { data } = response;
        const diets = results.flatMap(recipe => recipe.diets);
        const uniqueDiets = [...new Set(diets)];
        return uniqueDiets;
    } catch (error) {
        throw Error ("Error fetching diets from API");
    }
}




const loadDietsToDB = async (diets) => {
    try {
        const existingDiets = await Diet.findAll();
        const existingDietName = existingDiets.map(diet => diet.name);
        const newDiets = diets.filter(diet => !existingDietName.includes(diet));
        await Diet.bulkCreate(newDiets.map(name => ({name})));
    } catch (error) {
        throw Error ("Error loadind diets from DB")
    }
}

const fetchAndSavedDiets = async (req, res) => {
    try {
        const diets = await getDietsFromApi();
        await loadDietsToDB(diets);
        res.status(200).json(diets);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    
    fetchAndSavedDiets
}