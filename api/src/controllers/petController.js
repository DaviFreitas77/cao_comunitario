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
            const userId = req.userId;
            console.log(userId)

            const locationUser = await User.findOne({ where: { id: userId } })

            if (!locationUser) {
                return res.status(400).json({ message: "Usuário não encontrado" });
            }

            const city = locationUser.city



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
                        model: CareRelationship,
                        as: "cares",
                        include: {
                            model: Carepet,
                            as: "descCares",
                            attributes: ['nameCare']
                        }
                    }
                ]
                , where: {
                    city: city
                }
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
            const { namePet, aboutPet, typePet, imagePet, genderPet, agePet, fkTemperament, fkCare, city } = req.body;


            if (!namePet || !typePet || !imagePet || !genderPet || !agePet || !fkTemperament || !fkCare || !city) {
                return res.status(400).json({ message: "preencha todos os campos" });
            }

            const userId = req.userId;

            const pet = await Pet.create({ namePet, aboutPet, typePet, imagePet, genderPet, agePet, onwerPet: userId, city })

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
    },


    async getPetId(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "id não encontrado" })
        }

        const pets = await Pet.findOne({
            include: [
                {
                    model: TypePet,
                    as: "type",
                    attributes: ['nameType']
                },
                {
                    model: GenderPet,
                    as: 'gender',
                    attributes: ['nameGender']
                },
                {
                    model: AgePet,
                    as: 'age',
                    attributes: ['nameAge']
                },
                {
                    model: User,
                    as: "onwer",
                    attributes: ["name", "image"]
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
                    model: CareRelationship,
                    as: "cares",
                    include: {
                        model: Carepet,
                        as: "descCares",
                        attributes: ['nameCare']
                    }
                }

            ]
            , where: {
                id: id
            },
        })
        if (!pets) {
            return res.status(400).json({ message: "pet não encontrado" })
        }

        return res.status(200).json(pets)
    },

    async myPet(req, res) {
        try {
            const idUser = req.userId;
            console.log(idUser)

            if (!idUser) {
                return res.status(400).json({ message: "id não encontrado" })
            }
            const pets = await Pet.findAll({
                include: [

                    {
                        model: AgePet,
                        as: 'age',
                        attributes: ['nameAge']
                    },
                    {
                        model: TypePet,
                        as: 'type',
                        attributes: ['nameType']
                    },
                    {
                        model: GenderPet,
                        as: "gender",
                        attributes: ['nameGender']
                    }

                ], where: { onwerPet: idUser }
            })

            if (pets.length === 0) {
                return res.status(400).send({ message: "nenhum pet encontrado" })
            }
            return res.status(200).send(pets)
        }
        catch (err) {
            console.error("Erro ao buscar pets:", err);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }



    },

    async deleteMyPet(req,res){
        const {idPet} = req.params;
        const idUser = req.userId

        if(!idPet){
            return res.status(400).send({message:"erro,pet não encontrado"})
        }

        const pet = await Pet.findOne({where:{id:idPet,onwerPet:idUser}})

        pet.destroy()
        return res.status(200).send({message:"pet deletado com sucesso"})

    }
};
