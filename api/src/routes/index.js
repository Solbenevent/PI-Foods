const { Router } = require('express');
const { getRecipeById  } = require("../controllers/getRecipeById");
//const  { getRecipes }  = require("../controllers/getAllRecipes");
const { fetchAndSaveRecipes } = require("../controllers/getAllRecipes");
const { searchRecipesNames} = require("../controllers/getRecipeByName");
const {fetchAndSavedDiets } = require("../controllers/getAllDiets");
const { createRecipes } = require("../controllers/createRecipes");
const { deleteRecipe } = require("../controllers/deleteRecipe")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/recipes", fetchAndSaveRecipes)
router.get("/recipes/name", searchRecipesNames);
router.get("/recipes/:id", getRecipeById );
router.get("/diets", fetchAndSavedDiets);
router.post("/recipes", createRecipes);
router.delete("/recipes/:id", deleteRecipe)

module.exports = router;
