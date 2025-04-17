const { Model, DataTypes } = require("sequelize");


class FavoritePet extends Model{
    static init(sequelize){
        super.init({
            idUser:{
                type:DataTypes.INTEGER,
                references:{
                    model:'users',
                    key:'id'
                },
              idPet:{
                type:DataTypes.INTEGER,
                references:{
                    model:'pets',
                    key:'id'
                }
              }  
            }
        },{
            sequelize
        })
    }


    static associate(models){
        this.belongsTo(models.User,{foreignKey:'idUser', as: 'user'})

        this.belongsTo(models.Pet,{foreignKey:'idPet', as: 'pet'})
    }
}

module.exports = FavoritePet;