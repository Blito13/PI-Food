
const {Router} = require('express')
const {getDiets}= require('../controllers/dietController.js')
const router = Router();

router.get('/diets' , getDiets)

module.exports = router;