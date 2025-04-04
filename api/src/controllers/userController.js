const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: 'E-mail ou senha incorretos'
                });
            }

            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (!passwordMatch) {
                console.log("Senha incorreta para o usuário:", email);
                return res.status(400).send({
                    message: 'Senha incorreta'
                });
            }

            const token = generateToken({ id: user.id });

            const userId = user.id;
            await User.update({ is_logged: 1 }, { where: { id: userId } });

            return res.status(200).send({
                message: "Usuário logado com sucesso",
                user,
                token
            });
        } catch (error) {
            console.error("Erro ao buscar usuário:", error); 
            return res.status(500).send("Erro ao buscar usuário");
        }
    },


    async logout(req, res) {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(400).send({ message: "usuario não encontrado" })
            }
            await User.update({ isLogged: 0 }, { where: { id: userId } })

        } catch (error) {
            console.error(error)
        }


    },

    async index(req, res) {
        try {
            const users = await User.findAll();

            if (!users || users.length === 0) {
                return res.status(200).send("Nenhum usuário encontrado");
            }
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    async store(req, res) {
        try {
            const { name, password, email, number, image, city } = req.body;
            if (!name || !password || !email || !number || !image || !city) {
                return res.status(400).send('Campos obrigatórios não preenchidos');
            }
            const user = await User.create({ name, password, email, number, image, city });

            const token = generateToken({ id: user.id });

            await User.update({ isLogged: 1 }, { where: { id: user.id } })

            return res.status(201).send({
                user,
                token
            });
        } catch (error) {
            console.log("Erro ao criar usuário:", error);
            return res.status(500).send(error);
        }

    },

    async update(req, res) {
        try {
            const { name, password, email } = req.body;
            const { userId } = req.params;

            if (!name || !password || !email) {
                return res.status(400).send('Campos obrigatórios não preenchidos');
            }

            await User.update({ name, password, email }, { where: { id: userId } })
            return res.status(200).send('Usuário atualizado com sucesso');
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const { userId } = req.params;
            await User.destroy({ where: { id: userId } });
            return res.status(200).send({
                message: 'Usuário excluído com sucesso'
            });
        } catch (error) {
            return res.status(500).send('Erro ao excluir usuário');
        }
    }
}