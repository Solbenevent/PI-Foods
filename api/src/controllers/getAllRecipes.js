const axios = require("axios");
require("dotenv").config();
const { Recipe, Diet } = require("../db");
const API_KEY = process.env.API_KEY;

const getApiInfo = async () => {
    try {
        const responseAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const { results } = responseAxios.data;

        if(results) {
            let response = await results?.map((result) => {
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
            return response;
        }
    } catch (error) {
        console.lof("error")
    }
}

const getDBInfo = async () => {
    try {
        const dataDB = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                as: "diet",
                through: {
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.diets?.map(diet => diet.name),
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getAllInfo = async (req, res) => {
    try {
        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        const allInfo = apiInfo.concat(bdInfo);
        return res.status(200).json(allInfo);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

module.exports = {
    getApiInfo,
    getDBInfo,
    getAllInfo
}