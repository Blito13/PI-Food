const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('step',{
        number:{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        step : {
            type: DataTypes.TEXT,
            allowNull : false
        }
    } )
}

