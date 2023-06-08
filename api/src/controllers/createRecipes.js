
const { Recipe, Diet } = require("../db");

const createRecipes = async (req, res) => {
  let { name, image, diets, steps, summary, healthScore } = req.body;
  try {
      let dietIds = diets.split(",")
      let recipeCreated = await Recipe.create({
       name, 
       image,
       diets: dietIds,
       steps,
       summary, 
       healthScore
      })

  let dietBD = await Diet.findAll({
    where: { name: diets }
  })

  if(!name || !summary || !healthScore) return res.status(400).send({ error: "Fields must be complete"});

  recipeCreated.addDiet(dietBD);
  res.send("Recipe created successfully")
  } catch (error) {
    res.status(500).send({error: error.message})
  }

}

module.exports = {
  createRecipes,
}

