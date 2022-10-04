require('dotenv').config(); 
const { Router } = require("express");
const axios = require ('axios');
const {Recipe , Diet} = require ('../db');
const { getById, 
        getByName,
        getAllrecipes,
        getDB , 
        getApi,
     } = require('../controllers/recipesControler');
const router = Router();
const {YOUR_API_KEY} = process.env;


/* const getApi = async () =>{
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
        console.log(apiInfo)
    return apiInfo;

}; */

  /* const getDB = async () =>{ 
   const lex= await Recipe.findAll({
      

           attributes: ['steps'],
           
     
    })
    console.log(lex)
    return await Recipe.findAll({  
        include: { 
            model: Diet, 
            attributes: ['name'],
            through: {
                attributes: [],   
            },
        }
    })
    }   */ 
   
/* const getAllrecipes = async ()=>{
    const apInfo = await getApi();
    const dbInfo = await getDB();
    const infoTotal = [...apInfo, ...dbInfo]; 
    return infoTotal;
}; */
/*  router.get('/' , getApi)
 router.get('/' ,getDB) */
/* router.get('/recipes',getAllrecipes) */
router.get('/recipes',getAllrecipes)





/* async (req, res)=>{
    const {name} = req.query
    const recipesTotal = await getAllrecipes() 
    if (name) { 
        let recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                                                      
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("Recipe doesn't exist")
        } else {
        res.status(200).send(recipesTotal) 
    }
}) */

/* router.get('/edit', async(req , res )=> {
    
    try{
        const fix = getAllrecipes();

       res.status(200).send((await fix).map(e=>e.name))
      
    }
    catch(error){
        console.log('aeeeea')
    }
  }) */



router.get('/recipes/:id' , getById)




/* , async (req, res)=>{
    const {id} = req.params; 
    const recipesTotal = await getAllrecipes();
    console.log(recipesTotal)
    if(id){        
        const recipeId = recipesTotal.filter(el=>el.id == id)
        recipeId.length?
        res.status(200).send(recipeId) :
        res.status(404).send('Recipe not found') 
    }
}); */

/* router.post('/', (req , res )=> {
  const resultApi = apiSpoonacular.data.results
    res.send ('soy post home')
}) */
/* router.delete('/', (req , res )=> {
    res.send ('soy delete home')
})
 */

module.exports = router;    