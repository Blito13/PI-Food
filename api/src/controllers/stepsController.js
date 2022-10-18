const {Instructions ,Recipe} =  require ('../db')

const createStep = async (req , res  ) => {
    const {steps} = req.body;
    const consj = await Instructions.findAll()
   /*  const asi = addInstructions() */
  res.send(consj)
}
module.exports = {createStep}