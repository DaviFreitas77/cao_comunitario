const {Model,DataTypes} = require('sequelize');

class AgePet extends Model{
    static init(sequelize){
        super.init({
            nameAge:DataTypes.STRING,
         
        },{
            sequelize,
            tableName:'agepet'
        })
    }
}

module.exports = AgePet;