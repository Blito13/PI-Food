const { Router } = require( "express");
const { createStep } = require ("../controllers/stepsController.js");
const route = Router();

route.get('/steps' ,createStep )
module.exports =  route;
