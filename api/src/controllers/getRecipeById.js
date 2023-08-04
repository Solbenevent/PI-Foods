
const { Recipe, Diet } = require("../db");

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findByPk(id, {
            include: [
              {
                model: Diet,
                as: "diets",
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
            ],
          });
          
        
        if(!recipe) {
          throw new Error("Recipe not found");
        }
        const recipeId = {
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
            vegetarian: recipe.vegetarian,
            vegan: recipe.vegan,
            glutenFree: recipe.glutenFree,
            summary: recipe.summary,
            steps: recipe.steps.map(step => step),
            diets: recipe.diets.map(diet => diet.name)
        };

        return res.status(200).json(recipeId);
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong");
    }
}

module.exports = {
    getRecipeById   
}
 