
const CarePet = require('../models/CarePet')


module.exports = {
    async store(req,res){
        const {nameCare} = req.body;

        if(!nameCare){
            return res.status(400).send({message:"Preencha todos os campos"});
        }

        const existingCare = await CarePet.findOne({where:{nameCare}});

        if(existingCare){
            return res.status(400).send({message:"cuidado ja cadastrado!"})
        }

        const care = await CarePet.create({nameCare});
        return res.status(200).send({message:"cuidado cadastrado!"})
    },

    async index(req,res){
        try {
            const cares = await CarePet.findAll();


            if(!cares || cares.lenght === 0){
                return res.status(400).send({message:"nenhum cuidado registrado"})

            }
            return res.status(200).send(cares)
        } catch (error) {
            console.log(error)
        }
      
    }
}