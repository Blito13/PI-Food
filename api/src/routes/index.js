const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
/* const recipes = require('./Routes.js'); */
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* 
MiddleWares */
/* router.use('/recipes' ,recipeRoute);
router.use('/diets' , dietsRoute); */

const recipes = require('./recipes.js');
const diets = require('./diets.js');
const recipe = require('./recipe.js');

// Configurar los routers

router.use('/recipes', recipes)
router.use('/recipe', recipe)
router.use('/types', diets)




/* router.use("/recipes", getApiInfo); */
/* router.use("/recipes/:idRecipe", searchId);
router.use("/types", getTypes); */ 
/* router.use("/recipe", getRecipe); */
/* router.use('/recipes', recipes); */

module.exports = router;    