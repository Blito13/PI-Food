const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('instructions',{
   
        number:{
            type : DataTypes.INTEGER,
            allowNull : true},
            
        step : {
            type: DataTypes.TEXT,
            allowNull : true
        }
    } )
}

