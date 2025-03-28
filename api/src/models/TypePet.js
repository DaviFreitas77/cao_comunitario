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


    static associate(models){
           // Relacionando TypePet com Pet, onde TypePet tem muitos Pets
        this.hasMany(models.Pet,{foreignKey:'typePet', as:'type'})
    }
}

module.exports = TypePet;