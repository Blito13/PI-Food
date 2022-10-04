const {Router} = require ('express');
const {Recipe, Diet} = require ('../db');
const recipe = Router();

const postRecipe = async (req , res) =>{
    
        const { name, summary, score, healthScore, steps, diets, image, createdINBd } = req.body;
    
        const recipeCreated = await Recipe.create({                
            name,
            summary,
            score,
            healthScore,
            steps,   
            image,
            createdINBd 
        });
        const typesDb = await Diet.findAll({where: {name: diets}}) 
        console.log(recipeCreated)
        recipeCreated.addDiet(typesDb)
        res.send('Recipe created successfully')
    
}
module.exports = postRecipe