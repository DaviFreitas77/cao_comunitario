const { Model, DataTypes } = require("sequelize");


class TypePet extends Model{
    static init(sequelize){
        super.init({
            nameType:DataTypes.STRING
        },{
            sequelize,
            tableName: 'typePet'  
        })
    }
}

module.exports = TypePet;