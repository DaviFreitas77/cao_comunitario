const {Model,DataTypes} = require('sequelize');


class GenderPet extends Model{
    static init(sequelize){
        super.init({
            nameGender:DataTypes.STRING,
         
        },{
            sequelize
        })
    }
}

module.exports = GenderPet;