
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize"); 

const createRecipes = async (req, res) => {
  let{
    name,
    summary,
    healthScore,
    image,
    steps,
    diets,
} = req.body

 try {
    if(!name && !summary && !healthScore && !image && !diets) 
      return res.status(400).json({ message: "Debe completar los campos"}); 
      
      const recipeCreated = await Recipe.create({
        name,
        summary,
        healthScore,
        image,
        steps,
        created: true,
      });

     const dietDB = await Diet.findAll({
        where: { name: {
          [Op.in] : diets
        } }
     });
     recipeCreated.addDiet(dietDB);
     return res.status(201).json({ message: "Receta creada exitosamente" }); 

} catch(error) {
    return res.status(500).json({ message: "Algo salió mal con el formulario" + error.message });
}
}


module.exports = {
  createRecipes,
}

