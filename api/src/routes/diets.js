
const {Router} = require('express')
const getDiets = require('../controllers/dietController')
const router = Router();

router.get('/diets' , getDiets)

module.exports = router;