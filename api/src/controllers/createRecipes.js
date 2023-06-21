


const { Recipe, Diet } = require("../db");



const createRecipes = async (req, res) => {
  let{
    name,
    summary,
    score,
    healthScore,
    image,
    steps,
    diets
} = req.body

try{
    let recipeCreate = await Recipe.create({ 
        name,
        summary,
        score,
        healthScore,
        image,
        steps,
    })

    let dietDB = await Diet.findAll({ //para buscar todas las dietas que queremos asociar a la receta
        where: {name: diets}
    })

    if (!name) return res.status(400).send({error: 'Debe ingresar el name para la receta'});
    if (!summary) return res.status(400).send({error: 'Debe ingresar un summary del receta'});
    if(!healthScore) return res.status(400).send({error: "Debe ingresar heatlh score"})
    // console.log(recipeCreate);
    // console.log(dietDB);
    
    recipeCreate.addDiet(dietDB); //para asociar esas dietas a la receta
    res.send('Succesfull');

}catch(error){
    res.status(400).send(error);
}
}



module.exports = {
  createRecipes,
}

