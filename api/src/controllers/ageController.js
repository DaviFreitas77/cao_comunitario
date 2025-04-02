

const Age = require('../models/AgePet');

module.exports = {
    async store(req, res) {
        try {
            const { nameAge } = req.body;

            if (!nameAge || nameAge.length === 0) {
                return res.status(400).send({ error: 'Nome da idade não informado' })
            }
            const age = await Age.create({ nameAge })
            return res.status(200).send({ 'message': 'idaade criada com sucesso' })
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Erro ao criar a idade' })
        }
    }
}