const { verify } = require('jsonwebtoken');
const FavoritePet = require('../models/FavoritePet');
const AgePet = require('../models/AgePet');
const TypePet = require('../models/typePet');
const GenderPet = require('../models/GenderPet');


module.exports = {
    async store(req, res) {
        const { idPet } = req.body
        const idUser = req.userId;

        if (!idPet) {
            return res.status(400).json({ error: 'Favoritar um pet sem id não é permitido' })
        }
        const favorite = await FavoritePet.create({ idUser, idPet })
        return res.status(200).send({ message: 'Pet favoritado com sucesso' })
    },

    async index(req, res) {
        const idUser = req.userId

        const favorites = await FavoritePet.findAll({
            include: [
                {
                    association: 'pet',
                    as: 'pet',
                    attributes: ['namePet', 'aboutPet', 'imagePet',],
                    include: [
                        {
                            association: 'type',
                            as: 'type',
                            attributes: ['nameType']
                        },
                        {
                            association: 'age',
                            as: 'age',
                            attributes: ['nameAge']
                        },
                        {
                            association: 'gender',
                            as: "gender",
                            attributes: ['nameGender']
                        }
                    ]

                },
                {
                    association: 'user',
                    as: "user",
                    attributes: ['name', 'image']
                }
            ], where: {
                idUser
            }
        })
        if (favorites.length === 0) {
            return res.status(404).json({ error: 'Nenhum pet favoritado' })
        }
        return res.json(favorites)
    },

    async verifyFavorite(req, res) {
        const { idPet } = req.params
        const idUser = req.userId

        const existingPet = await FavoritePet.findOne({ where: { idUser, idPet } })
        console.log(existingPet)
        if (existingPet) {
            return res.status(200).send(true)
        }
        return res.status(200).send(false)
    },
    async myPet(req, res) {
        try {
            const idUser = req.userId;
            console.log(idUser)
            if (!idUser) {
                return res.status(400).json({ message: "id não encontrado" })
            }
            const pets = await FavoritePet.findAll({
                include: [
                    {
                        association: 'pet',
                        as: 'pet',
                        attributes: ['namePet', 'aboutPet', 'imagePet'],

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


                        ]

                    },

                ], where: {
                    idUser
                }
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



    }

}