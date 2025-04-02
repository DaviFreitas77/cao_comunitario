const Pet = require('../models/Pet');
const User = require('../models/User');
const TypePet = require('../models/typePet')
const AgePet = require('../models/AgePet')
const GenderPet = require('../models/GenderPet')
const TemperamentRelationship = require('../models/TemperamentRelationship')
const TemperamentPet = require("../models/TemperamentPet")
const CareRelationship = require('../models/CareRelationship')
const Carepet = require('../models/CarePet')

module.exports = {
    async index(req, res) {
        try {
            const pets = await Pet.findAll({
                include: [

                    {
                        model: TypePet,
                        as: "type",
                        attributes: ['nameType']
                    },

                    {
                        model: User,
                        as: "onwer",
                        attributes: ["name", "image"]
                    },
                    {
                        model: AgePet,
                        as: 'age',
                        attributes: ['nameAge']
                    },
                    {
                        model: GenderPet,
                        as: "gender",
                        attributes: ['nameGender']
                    },
                    {
                        model: TemperamentRelationship,
                        as: "temperaments",
                        include: {
                            model: TemperamentPet, // A tabela de temperamento
                            as: "temperament",
                            attributes: ['nameTemperament'] // Traga o campo nameTemperament
                        }
                    },
                    {
                        model:CareRelationship,
                        as:"cares",
                        include:{
                            model:Carepet,
                            as:"descCares",
                            attributes:['nameCare']
                        }
                    }
                ]
            });

            if (!pets || pets.length === 0) {
                return res.status(200).json({ message: "Nenhum pet encontrado" });
            }

            return res.status(200).json(pets);
        } catch (err) {
            console.error("Erro ao buscar pets:", err);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    },

    async store(req, res) {
        try {
            const { namePet, aboutPet, typePet, imagePet, genderPet, agePet, fkTemperament, fkCare } = req.body;


            if (!namePet || !typePet || !imagePet || !genderPet || !agePet || !fkTemperament || !fkCare) {
                return res.status(400).json({ message: "preencha todos os campos" });
            }

            const userId = req.userId;

            const pet = await Pet.create({ namePet, aboutPet, typePet, imagePet, genderPet, agePet, onwerPet: userId })

            if (Array.isArray(fkCare)) {
                fkCare.forEach(async (care) => {
                    console.log(care)
                    await CareRelationship.create({
                        fkCare: care,
                        fkPet: pet.id
                    })
                })
            }

            if (Array.isArray(fkTemperament)) {
                fkTemperament.forEach(async (temperament) => {
                    await TemperamentRelationship.create({
                        fkTemperament: temperament,
                        fkPet: pet.id // Usando o ID do pet criado
                    });
                });
            }


            return res.status(200).json({ message: "Pet cadastrado com sucesso" });

        } catch (error) {
            console.log(error);
        }
    }
};
