const {Model,DataTypes} = require('sequelize');


class Pet extends Model{
    static init(sequelize){
        super.init({
            namePet:DataTypes.STRING,
            aboutPet:DataTypes.STRING,
            typePet:{
                type:DataTypes.INTEGER,
                references:{
                    model:'TypePet',
                    key:'id'
                }
            },
            imagePet:DataTypes.STRING,
            genderPet:DataTypes.INTEGER,
            agePet:{
                type:DataTypes.INTEGER,
                references:{
                    model:'AgePet',
                    key:'id'
                }
            },
            onwerPet: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id' 
                }
            }
        },{
            sequelize
        })
    }

    static associate(models) {
        // Um pet pertence a um usuário (dono)
        this.belongsTo(models.User, { foreignKey: 'onwerPet', as: 'onwer' });

        // Um pet pertence a um tipo
        this.belongsTo(models.TypePet, { foreignKey: 'typePet', as: 'type' });

        this.belongsTo(models.AgePet,{foreignKey:'agePet',as: 'age'});

        this.belongsTo(models.GenderPet,{foreignKey:'genderPet',as: 'gender'})
        
        this.hasMany(models.TemperamentPetRelationship, { foreignKey: 'fkPet', as: 'temperaments' });


        this.hasMany(models.CareRelationship,{foreignKey:"fkPet",as: 'cares'});
    }

}

module.exports = Pet;