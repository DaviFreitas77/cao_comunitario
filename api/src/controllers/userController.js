const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 2592000 // 30 dias,
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
            await User.update({ isLogged: true }, { where: { id: userId } });

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
            console.log(userId)
            if (!userId) {
                return res.status(400).send({ message: "usuario não encontrado" })
            }
            await User.update({ isLogged: 0 }, { where: { id: userId } })
            return res.status(200).send({ message: "Usuário deslogado com sucesso" })

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

            const emailExisting = await User.findOne({ where: { email } })
            const numberExisting = await User.findOne({ where: { number } })
            if (emailExisting) {
                return res.status(400).send('ops,ja existe uma conta associada a esse email');
            }
            if (numberExisting) {
                return res.status(400).send('ja existe uma conta associada a esse numero');
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
            const { name, number, image } = req.body;
            const idUser = req.userId;
            console.log("userId recebido:", idUser);

            if (!name && !number && !image) {
                return res.status(400).send({ message: 'Campos obrigatórios não preenchidos' });
            }

            if (!name && number) {
                await User.update({ number }, { where: { id: idUser } })
                return res.status(200).send({ message: 'Número atualizado com sucesso' });
            }

            if (!number && name) {
                await User.update({ name }, { where: { id: idUser } })
                return res.status(200).send({ message: 'Nome atualizado com sucesso' });
            }

            if (image) {
                await User.update({ image }, { where: { id: idUser } })
                return res.status(200).send({ message: 'Imagem atualizada com sucesso' });
            }

            await User.update({ name, number }, { where: { id: idUser } })
            return res.status(200).send({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
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
    },

    async userExisting(req, res) {
        try {
            const email = req.params.email;

            const user = await User.findOne({ where: { email } })

            if (!user) {
                return res.status(400).send({ message: "Usuário não encontrado" })
            }

            await User.update({ isLogged: true }, { where: { email } })
            const token = generateToken({ id: user.id });

            return res.status(200).send({ user, token })


        } catch (error) {
            console.log(error)
        }






    }

}