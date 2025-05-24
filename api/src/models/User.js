const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            number: DataTypes.STRING,
            image: DataTypes.STRING,
            city: DataTypes.STRING,
            isLogged: DataTypes.BOOLEAN
        }, {
            sequelize,
            tableName: 'users',
            hooks: {
                beforeCreate: (user) => {
                    if (user.password) {
                        const salt = bcrypt.genSaltSync();
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        })
    }
    static associate(models) {
        this.hasMany(models.Pet, { foreignKey: 'onwerPet', as: 'pets' });


    }
}

module.exports = User;