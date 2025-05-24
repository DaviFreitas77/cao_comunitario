const { Model, DataTypes } = require("sequelize")


class TemperamentPetRelationship extends Model {
    static init(sequelize) {
        super.init({
            fkTemperament: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'TemperamentPet',
                    key: "id"
                }
            },
            fkPet: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Pets',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName:"temperamentRelationship"
        })
    }

    static associate(models) {
        // Relacionamento de muitos para um com TemperamentPet
        this.belongsTo(models.TemperamentPet, {
            foreignKey: 'fkTemperament',
            as: 'temperament'
        });

        // Relacionamento de muitos para um com Pet
        this.belongsTo(models.Pet, {
            foreignKey: 'fkPet',
            as: 'pet'
        });
    }
}

module.exports = TemperamentPetRelationship;