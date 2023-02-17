/* require('dotenv').config();  */
/* const { Router } = require("express"); */
const axios = require ('axios');
/* const {Recipe , Diet} = require ('../db'); */
const {getAllrecipes , getById , getByName , postRecipe , updateRec ,deleteRec}  = require('../controllers/recipesController.js');
/* const router = Router(); */
var express = require('express');
var router = express.Router();
router.get('/recipes',getAllrecipes )
router.get('/recipes/:id',getById)
router.get('/recipes?name=',getByName)
router.post('/recipes',postRecipe);
router.put('/recipes/uppdate' ,updateRec);
router.delete('/recipes/delete/:id' ,deleteRec);

module.exports = router;    

