require('dotenv').config(); 
const axios = require ('axios');
const { types } = require('pg');
const {Recipe , Diet , Step} = require ('../db')
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
              }
          },
         
      })
}   
const getAllrecipes = async ()=>{
        const apInfo = await getApi();
        const dbInfo = await getDB();
        console.log(dbInfo)
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
    console.log(recipeCreated)
    recipeCreated.addDiet(typesDb)
    /* recipeCreated.addStep(steps) */
    res.send('Recipe created successfully')

}
const updateRec = async (req , res) =>{
    const {diets ,id , ...newBody} =req.body;
    
    try{
       
        let recipeToUpdate= await Recipe.findByPk(id)
        recipeToUpdate.set(newBody)
         recipeToUpdate.save();
         if(diets){
            const typesDb = await Diet.findAll({where: {name: diets}})
            const gol = await recipeToUpdate.setDiets(typesDb)
         }
        res.send(recipeToUpdate)


    } catch (error)
    {console.log(error)}
}
const deleteRec = async (req, res) => {
    try {
      const { id } = req.params;
      await Recipe.destroy({ where: { id } });
  
      // return message "No content"
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  


module.exports = {
    getAllrecipes,
    getById,
    getByName,
    postRecipe,
    updateRec,
    deleteRec
} 
  