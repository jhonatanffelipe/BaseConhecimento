const bcrypt = require('bcrypt-nodejs')
const { request } = require('express')

module.exports = app => {
    const { existisOrError, equalsOrError, notExistsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (request, response) => {
        const user = { ...request.body }


        if (request.params.id) {
            user.id = request.params.id
        }

        try {
            existisOrError(user.name, 'Nome não informado')
            existisOrError(user.email, 'E-mail não informado')
            existisOrError(user.password, 'Senha não informada')
            existisOrError(user.confirmPassword, 'Confirmação de senha não informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')


            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (error) {
            return response.status(400).send(error)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(() => response.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin
                }))
                .catch(error => response.status(500).send(error))
        } else {
            app.db('users')
                .insert(user)
                .then(() => response.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin
                }))
                .catch(error => response.status(500).send(error))

        }
    }

    const get = (request, response) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => response.json(users))
            .catch(error => response.status(500).send(error))

    }

    const getById = (request, response) => {
        const id = request.params.id

        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: id })
            .whereNull('deletedAt')
            .first()
            .then(users => response.json(users))
            .catch(error => response.status(500).send(error))


    }

    const remove = async (request, response) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: request.params.id })
            notExistsOrError(articles, 'Usuário possui artigos publicados.')

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: request.params.id })
            existisOrError(rowsUpdated, 'Usuário não foi encontrado.')

            response.status(204).send()
        } catch (error) {
            response.status(400).send(error)
        }
    }
    return { save, get, getById, remove }
}