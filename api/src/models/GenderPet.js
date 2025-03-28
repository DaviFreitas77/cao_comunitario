const {Model,DataTypes} = require('sequelize');


class GenderPet extends Model{
    static init(sequelize){
        super.init({
            nameGender:DataTypes.STRING,
         
        },{
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Pet,{foreignKey:'genderPet',as:'gender'})
    }
}

module.exports = GenderPet;