
const TypePet = require('../models/TypePet');

module.exports = {
  async store(req, res) {
    try {
      const { nameType,imageType } = req.body;
      if (!nameType) {
        return res.status(400).send({ 'message': 'preencha todos os campos' })
      }
      const type = await TypePet.create({ nameType,imageType })
      return res.status(200).send({ 'message': 'Tipo de pet cadastrado com sucesso' })
    } catch (error) {
      console.error("Erro ao cadastrar tipo de pet:", error);
      return res.status(500).send({ 'error': 'Erro interno no servidor', 'details': error.message });
    }

  },

  async index(req, res) {
    try {
      const typesPet = await TypePet.findAll();

      if (!typesPet || typesPet.lenght == 0) {
        return res.status(400).send({ message: "nenhum pet encontrado" })
      }

      return res.status(200).send(typesPet)
    } catch (error) {
      console.error(error)
    }
  }
}