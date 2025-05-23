const { verify } = require('jsonwebtoken');
const FavoritePet = require('../models/FavoritePet');
const AgePet = require('../models/AgePet');
const TypePet = require('../models/TypePet');
const GenderPet = require('../models/GenderPet');


module.exports = {
    async store(req, res) {
        try {
            const { idPet } = req.body
            const idUser = req.userId;

            if (!idPet) {
                return res.status(400).json({ error: 'Favoritar um pet sem id não é permitido' })
            }

            const existingPet = await FavoritePet.findOne({ where: { idPet, idUser } })
            if (existingPet) {
                return res.status(400).send({ message: "este pet ja está favoritado" })
            }
            const favorite = await FavoritePet.create({ idUser, idPet })
            return res.status(200).send({ message: 'Pet favoritado com sucesso' })
        } catch (error) {
            console.log(error)
        }

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
   

    async deletedFavorite(req, res) {
        const { idPet } = req.params;
        const idUser = req.userId;

        console.log(idPet)


        const existingPet = await FavoritePet.findOne({ where: { idPet, idUser } });

        if (!existingPet) {
            return res.status(400).send({ message: "nenhum pet encontrado" })
        }

        await existingPet.destroy()
        return res.status(200).send({ message: "pet deletado" })

    }

}