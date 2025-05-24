const { Model, DataTypes, STRING } = require("sequelize");



class CarePet extends Model{
    static init(sequelize){
        super.init({
            nameCare:{
                type:DataTypes.STRING
            },
        },{
            sequelize,
            tableName:'carePet'
        })
    }

    static associate(models){
        this.hasMany(models.CareRelationship,{foreignKey:"fkCare", as: "descCares"})
    }
}


module.exports = CarePet;