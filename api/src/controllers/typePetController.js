
const TypePet = require('../models/typePet');

module.exports ={
    async store(req,res){
      try {
        const {nameType} = req.body;
        if(!nameType){
            return res.status(400).send({'message':'preencha todos os campos'})
        }
        const type = await TypePet.create({nameType})
        return res.status(200).send({'message':'Tipo de pet cadastrado com sucesso'})
      } catch (error) {
        console.error("Erro ao cadastrar tipo de pet:", error);
        return res.status(500).send({ 'error': 'Erro interno no servidor', 'details': error.message });
      }
        
    }
}