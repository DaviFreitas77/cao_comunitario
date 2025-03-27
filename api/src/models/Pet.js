const {Model,DataTypes} = require('sequelize');


class Pet extends Model{
    static init(sequelize){
        super.init({
            namePet:DataTypes.STRING,
            aboutPet:DataTypes.STRING,
            typePet:DataTypes.STRING,
            imagePet:DataTypes.STRING,
            genderPet:DataTypes.INTEGER,
            agePet:DataTypes.INTEGER
        },{
            sequelize
        })
    }
}

module.exports = Pet;