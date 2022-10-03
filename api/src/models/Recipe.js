const { DataTypes, STRING } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey :true
    },
    summary : {
      type: DataTypes.TEXT,
      allowNull : false,
      },
    score : {
      type :DataTypes.FLOAT,
    },
    healthScore : {
      type: DataTypes.FLOAT,
      
    },
    steps : {
      type: DataTypes.STRING,
    },

    image : {
      type:DataTypes.STRING,
      allowNull : true
    },
    createdINBd: {                  
      type: DataTypes.BOOLEAN,  
      allowNull: false,  
      defaultValue: true
    }

    
  }, {timestamps:false});

};
