const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey :true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sumary : {
      type: DataTypes.TEXT,
      allowNull : false,
      },
    score : {
      type :DataTypes.FLOAT,
      defaultValue : 0,
      validate : {min : 0 , max :100},
    },
    healthScore:{
      type: DataTypes.FLOAT,
      
    },
    steps : {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull : true
    },

    image : {
      type:DataTypes.TEXT
    }

    
  });

};
