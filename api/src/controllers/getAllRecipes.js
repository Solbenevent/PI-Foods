//const axios = require("axios");
//require("dotenv").config();
const { Recipe, Diet } = require("../db");
const results = require("../../apiResults");
//const API_KEY4 = process.env.API_KEY4;

const getApiInfo = async () => {
   
        // const responseAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`);
        // const { results } = responseAxios.data;

        if(results) {
            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    id: result.id, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    summary:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):''),
                    created: false,
                }
                
            })
            
            return response;
        }
}

const getDBInfo = async () => {
    try {
        const dataDB = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                as: "diets",
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
                createdByUser: true,
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    const DBRecipe = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    return DBRecipe
}

const getAllInfo = async (req, res) => {
    try {
        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        const allInfo = apiInfo.concat(bdInfo);
        //const allInfo = [...apiInfo, ...bdInfo]
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