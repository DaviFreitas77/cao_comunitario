const Gender = require('../models/GenderPet');

module.exports = {
    async store(req, res) {
        try {
            const { nameGender } = req.body;

            if (!nameGender) {
                return res.status(400).send({ error: 'Nome do gênero não informado' })
            }

            const gender = await Gender.create({ nameGender })
            return res.status(200).send({ 'message': 'Gênero criado com sucesso' })
        } catch (err) {
            console.log(err)
        }
    }
}