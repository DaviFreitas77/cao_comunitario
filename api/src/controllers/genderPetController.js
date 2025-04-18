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
    },

    async index(req,res){
        try {
            const genders = await  Gender.findAll();

            if(genders.length === 0){
                return res.status(200).send('Nenhum gênero encontrado')
            }
            return res.status(200).send(genders)
        } catch (error) {
            console.log(error)
        }
    }
}