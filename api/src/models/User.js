const {Model,DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
class User extends Model{
    static init(sequelize){
        super.init({
            name:DataTypes.STRING,
            password:DataTypes.STRING,
            email:DataTypes.STRING,
            number:DataTypes.STRING,
            image:DataTypes.STRING
        },{
            sequelize,
            hooks:{
                beforeCreate:(user)=>{
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password,salt);
                }
            }
        })
    }
    static associate(models) {
        this.hasMany(models.Pet, { foreignKey: 'onwerPet', as: 'pets' });


    }
}

module.exports = User;