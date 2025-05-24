const {Model,DataTypes} = require('sequelize');

class AgePet extends Model{
    static init(sequelize){
        super.init({
            nameAge:DataTypes.STRING,
         
        },{
            sequelize,
            tableName:'agePet'
        })
    }

    static associate(models){
        this.hasMany(models.Pet,{foreignKey:'agePet',as :'afe'})
    }
}

module.exports = AgePet;