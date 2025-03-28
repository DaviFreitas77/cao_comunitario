const Pet = require('../models/Pet');
const User = require('../models/User');
const TypePet = require('../models/typePet')
const AgePet = require('../models/AgePet')
const GenderPet = require('../models/GenderPet')

module.exports = {
    async index(req, res) {
        try {
            const pets = await Pet.findAll({
                include: [

                    {
                        model:TypePet,
                        as:"type",
                        attributes:['nameType']
                    },

                    {
                        model: User,
                        as: "onwer",
                        attributes: ["name", "image"]
                    },
                    {
                        model:AgePet,
                        as:'age',
                        attributes:['nameAge']
                    },
                    {
                        model:GenderPet,
                        as:"gender",
                        attributes:['nameGender']
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
            const { namePet, aboutPet, typePet, imagePet, genderPet, agePet } = req.body;

            const userId = req.userId;

            if (!namePet || !typePet || !imagePet || !genderPet || !agePet) {
                return res.status(400).json({ message: "Dados inválidos" });
            }

            const pet = await Pet.create({ namePet, aboutPet, typePet, imagePet, genderPet, agePet, onwerPet: userId })
            return res.status(200).json({ message: "Pet cadastrado com sucesso" });

        } catch (error) {
            console.log(error);
        }
    }
};
