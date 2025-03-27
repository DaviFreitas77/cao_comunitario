const Pet = require('../models/Pet');

module.exports = {
    async index(req, res) {
        try {
            const pets = await Pet.findAll();

            if (!pets || pets.length === 0) {
                return res.status(200).json({ message: "Nenhum pet encontrado" });
            }

            return res.status(200).json(pets);
        } catch (err) {
            console.error("Erro ao buscar pets:", err);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
};
