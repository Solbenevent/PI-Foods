const { Router } = require('express');
const { getRecipeById } = require("../controllers/getRecipeById");
const  {getAllInfo}  = require("../controllers/getAllRecipes");
const { completeInfo } = require("../controllers/getRecipeByName");
const {fetchAndSavedDiets } = require("../controllers/getAllDiets");
const { createRecipes } = require("../controllers/createRecipes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/recipes", getAllInfo)
router.get("/recipes/name", completeInfo);
router.get("/recipes/:idRecipe", getRecipeById);
router.get("/diets", fetchAndSavedDiets);
router.post("/recipes", createRecipes);

module.exports = router;
