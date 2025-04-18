const { Model, DataTypes } = require("sequelize");


class TemperamentPet extends Model{
    static init(sequelize){
        super.init({
            nameTemperament:DataTypes.STRING 
        },{
            sequelize,
            tableName:"temperamentpet"
        })
    }

    static associate(models){
       
         this.hasMany(models.TemperamentPetRelationship, {
            foreignKey: 'fkTemperament',
            as: 'pets'
        });
       
    }
   
}


module.exports = TemperamentPet;