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
    }
}