require('dotenv').config(); 
const { Router } = require("express");
const axios = require ('axios');
const {Recipe , Diet} = require ('../db')
const router = Router();
const {YOUR_API_KEY} = process.env;


const getApi = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
    //console.log(apiUrl)

    const apiInfo = await apiUrl.data.results.map((el) =>{
            return {
                ID: el.id,                         
                name: el.title,
                image: el.image,
                score: el.spoonacularScore,            
                diets: el.diets,
                summary: el.summary,
                healthScore: el.healthScore,
                steps: el.analyzedInstructions[0]?.steps
            }
            
        });   
 
    return apiInfo;

};
// findAll trae la info que le pido de la DB
  const getDB = async () =>{
    return await Recipe.findAll({
        include: {
            model: Diet,//diet
            attributes: ['name'],  
            through: {
                attributes: [],   
            },
        }
    })
    }   
    //creo una constante que concatena lo que tiene en la api, y lo que tiene en la DB
const getAllrecipes = async ()=>{
    const apInfo = await getApi();
    const dbInfo = await getDB();
    const infoTotal = [...apInfo, ...dbInfo]; //concatena
    return infoTotal;
    };
//empieza con las rutas 
router.get('/', async (req, res)=>{
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
})
router.get('/:id', async (req, res)=>{
    const {id} = req.params; //busca recetas x id 
    const recipesTotal = await getAllrecipes();

    if(id){        
        const recipeId = recipesTotal.filter(el=>el.ID == id)
        recipeId.length?
        res.status(200).send(recipeId) :
        res.status(404).send('Recipe not found') 
    }
});
/* router.post('/', (req , res )=> {
  const resultApi = apiSpoonacular.data.results
    res.send ('soy post home')
})
router.put('/', (req , res )=> {
    res.send ('soy put home')
})
router.delete('/', (req , res )=> {
    res.send ('soy delete home')
})
 */

module.exports = router;    