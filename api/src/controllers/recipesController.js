require('dotenv').config(); 
/* const { Router } = require("express"); */
const axios = require ('axios');
const e = require('express');
const {Recipe , Diet ,Instructions } = require ('../db')
/* const router = Router(); */
const {YOUR_API_KEY} = process.env;


const getApi = async () =>{
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
    
        const apiInfo = await apiUrl.data.results.map((el) =>{
            return {
                id: el.id,                         
                name: el.title,
                image: el.image,
                score: el.spoonacularScore,            
                diets: el.diets,
                summary: el.summary,
                healthScore: el.healthScore,
                steps: el.analyzedInstructions[0]?.steps,
            }
        });   
       
    return apiInfo;
    } catch (error) {
        console.log(error)
    }
    

};
const getDB = async () =>{ 

      return await Recipe.findAll({
     
      /*   attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, */
        include: {
            model: Instructions,
            attributes:['step', 'number'],
            
        }
      })
}   
const getAllrecipes = async ()=>{
        const apInfo = await getApi();
        const dbInfo = await getDB();
        const infoTotal = [...apInfo, ...dbInfo]; 
     
        /* res.status(200).send(infoTotal)  */
       return(infoTotal)
        /* return infoTotal */
};
const getById =  async (req, res)=>{
    /* DRYDRYDRY */
    const {id} = req.params; 
   
    const recipesTotal = await getAllrecipes();
    
    if(id){        
        const recipeId = recipesTotal.filter(el=>el.id == id)
        recipeId.length?
        res.status(200).send(recipeId) :
        res.status(404).send('Recipe not found') 
    }
};
const getByName =  async (req, res)=>{
    const {name} = req.query
    const recipesTotal = await getAllrecipes() 
    if (name) { 
        let recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                                                      
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("Recipe doesn't exist")
        } else {
        res.status(200).send(recipesTotal) /////////////cambio
    }
}
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
    recipeCreated.addDiet(typesDb)
    /*  recipeCreated.addInstructions(s) */
    const rec = await recipeCreated.id
    const lef = await steps.map(e => {
    const lcomi = Instructions.create({
        RecipeId : rec,
        step : e.step,
        number : e.number,
      
    })
/*    it brings only the last one of all the steps  */
   /*  recipeCreated.addInstructions(lcomi) */
})  

   res.send('Recipe created successfully')


}
module.exports = {
    getAllrecipes,
    getById,
    getByName,
    postRecipe
} 
  