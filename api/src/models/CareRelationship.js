const { Model, DataTypes } = require("sequelize");



class CareRelationship extends Model{
    static init(sequelize){
        super.init({
            fkCare:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                    model:'CarePet',
                    key:"id"
                }
            },

            fkPet:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                    model:"pets",
                    key:"id"
                }
            }
        },{
            sequelize,
            tableName:'carerelationship'
        })
    }

    static associate(models){
        this.belongsTo(models.User,{foreignKey:'fkPet', as :"cares"});

        this.belongsTo(models.CarePet,{foreignKey:"fkCare", as:"descCares"})
    }
}

module.exports = CareRelationship;