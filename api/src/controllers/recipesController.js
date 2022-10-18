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
    
    /* where: {id_moneda: db.sequelize.literal('(select id_moneda from cuentas where id_tienda = 4)') }, */
};
const getDB = async () =>{ 

      return await Recipe.findAll({
        include: [{
            model: Instructions,
           }]

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
    const id = await recipeCreated.id
    const lef = await steps.map(e => {
    const lcomi = Instructions.create({
        RecipeId : id,
        step:e.step,
        number : e.number
    })
})  

   res.send('Recipe created successfully')


}
const updateRec = async (req , res) => {
    const {id} = req.params;
    const {name , steps , diets , sumary ,score ,healthScore ,image } =req.body;
   const back = await Recipe.findAll({
        where: {
          id: id
        }
      });
      console.log(name ,steps, diets ,score , sumary ,healthScore )
      res.send(back)
}
// Way 1
/* const user= await User.findOne({ where: { firstName: 'John' } });
await user.update({ lastName: "Jackson" }
//or
await User.update({ lastName: "Jackson" }, {
  where: {
    lastName: null
  }
}); */
// Way 2
/* const user= await User.findOne({ where: { firstName: 'John' } });
user.lastName = "Jackson" 
await user.save() */
module.exports = {
    getAllrecipes,
    getById,
    getByName,
    postRecipe,
    updateRec
} 
  