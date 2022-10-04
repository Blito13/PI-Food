const { Diet } = require('../db.js');
const axios = require ('axios');
const {YOUR_API_KEY} = process.env;


const getDiets  = async (req ,res ) =>{
    const diets= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
    let dieta = []
    diets.data.results.forEach(el=> dieta.push(...el.diets))
    dieta = [...new Set(dieta)] 

    dieta.forEach(el => {
    Diet.findOrCreate({ 
            where: { name: el }
        })
    })

    const allTypes = await Diet.findAll({
        attributes:['name'] 
    })
    res.send(allTypes)
}
module.exports = getDiets;