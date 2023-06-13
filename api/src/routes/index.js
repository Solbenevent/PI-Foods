const { Router } = require('express');
const { getRecipeById  } = require("../controllers/getRecipeById");
const  {getAllInfo}  = require("../controllers/getAllRecipes");
const { completeInfo } = require("../controllers/getRecipeByName");
const {fetchAndSavedDiets } = require("../controllers/getAllDiets");
const { createRecipes } = require("../controllers/createRecipes");
const { deleteRecipe } = require("../controllers/deleteRecipe")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/recipes", getAllInfo)
router.get("/recipes/name", completeInfo);
router.get("/recipes/:id", getRecipeById );
router.get("/diets", fetchAndSavedDiets);
router.post("/recipes", createRecipes);
router.delete("/recipes/:id", deleteRecipe)

module.exports = router;
