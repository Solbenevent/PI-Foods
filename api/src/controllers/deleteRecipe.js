const { Recipe } = require("../db");
const { uuid } = require("sequelize");

const deleteRecipe = async (req, res) => {
    const { id } = req.params.id;
    const parseId = uuid.parse(id);
    try {
        const recipe = await Recipe.findByPk(parseId);
        if(recipe) {
            await recipe.destroy();
            res.status(200).send("Recipe deleted successfully");
    } else {
        res.status(404).send("Recipe not found");
    }
} catch(error){
      res.status(500).send(error);
}
}

module.exports = { deleteRecipe } 