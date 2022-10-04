require('dotenv').config(); 
/* const { Router } = require("express"); */
const axios = require ('axios');
const {Recipe , Diet} = require ('../db')
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
          include: { 
              model: Diet, 
              attributes: ['name'],
              through: {
                  attributes: [],   
              },
          }
      })
      }   
const getAllrecipes = async ( req , res)=>{
        const apInfo = await getApi();
        const dbInfo = await getDB();
        const infoTotal = [...apInfo, ...dbInfo]; 
       res.send(infoTotal)/*  infoTotal; */
       
    };


const getById =  async (req, res)=>{
    const {id} = req.params; 
    const recipesTotal = await getAllrecipes();
    /* console.log(recipesTotal) */
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
        res.status(200).json(recipesTotal) /////////////cambio
    }
}
module.exports = {

    getAllrecipes,
} 
  