
const { Recipe, Diet } = require("../db");

const createRecipes = async (req, res) => {
  const { name, image, diets, steps, summary, healthScore } = req.body;
  try {
      //let dietId = diets.split(",")
      const recipeCreated = await Recipe.create({
       name, 
       image,
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
  return recipeCreated;
  } catch (error) {
    res.status(500).send({error: error.message})
  }

}

module.exports = {
  createRecipes,
}

// const createRecipe = async ({ title, img, summary, health_score, step_by_step, diets }) => {
//   const post = await Recipe.create({ title, img, summary, health_score, step_by_step })
//   if (diets && diets.length > 0) {
//       const foundDiets = await Diet.findAll({ //para buscar todas las dietas que queremos asociar a la receta
//           where: { name: diets }
//       })
//       await post.addDiets(foundDiets)//para asociar esas dietas a la receta
//   }

//   return post //representa la receta creada y asociada a las dieta en la DB