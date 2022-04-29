require('dotenv').config();
const {Router} = require('express')
const { Diet } = require('../db');
const axios = require ('axios');
const {YOUR_API_KEY} = process.env;
const router = Router()
  
// trae la info de las recetas y guarda en dietas 
// repasar

router.get('/', async (req, res) => {
    const diets= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
    let dieta = []
    diets.data.results.forEach(el=> dieta.push(...el.diets))
 dieta = [...new Set(dieta)] //configura y describe como se tiene q guardar la info en db
          

    dieta.forEach(el => {
        Diet.findOrCreate({ 
            where: { name: el }
        })
    })

    const allTypes = await Diet.findAll({
        attributes:['name']
    })
    res.send(allTypes)
})



module.exports = router;