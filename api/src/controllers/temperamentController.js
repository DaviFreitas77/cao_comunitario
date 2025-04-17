const TemperamentPet = require('../models/TemperamentPet')


module.exports = {
    async store(req, res) {
        try {
            const { nameTemperament } = req.body

            if (!nameTemperament) {
                return res.status(200).send({ message: "preencha todos os campos" })
            }

            const temperament = await TemperamentPet.create({ nameTemperament })
            return res.status(200).send({ message: 'Temperamento cadastrado!' })
        } catch (error) {
            console.log(error)
        }
    },

    async index(req,res) {
        try {
            const temperaments = await TemperamentPet.findAll();

            if(temperaments.length == 0){
                return res.status(400).send({message:"temperamentos não encontrado"})
            }

            return res.status(200).send(temperaments)
        } catch (error) {
            console.error(error)
        }
    }
}