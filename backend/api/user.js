const bcrypt = require('bcrypt-nodejs')


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
            return response.status(400).json({ message: error })
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(() => response.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin
                }))
                .catch(error => response.status(500).json({ message: error }))
        } else {
            app.db('users')
                .insert(user)
                .then(() => response.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin
                }))
                .catch(error => response.status(500).json({ message: error }))

        }
    }

    const get = (request, response) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => response.json(users))
            .catch(error => response.status(500).json({ message: error }))

    }
    return { save, get }
}