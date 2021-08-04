module.exports = app => {
    const { existisOrError, equalsOrError, notExistsOrError } = app.api.validation

    const save = (request, response) => {
        const category = { ...request.body }

        if (request.params.id) {
            category.id = request.params.id
        }

        try {
            existisOrError(category.name, 'Nome não informado')
        } catch (message) {
            return response.status(400).json({ message: message })
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(() => response.status(200).json(category))
                .catch(err => response.status(500).json({ message: err }))
        } else {
            app.db('categories')
                .insert(category)
                .then(() => response.status(200).json(category))
                .catch(err => response.status(500).json({ message: err }))
        }
    }

    const remove = async (request, response) => {
        try {
            existisOrError(request.params.id, 'Código da categoria n~ao foi informado.')

            const subCategory = await app.db('categories')
                .where({ parentId: request.params.id })
            notExistsOrError(subCategory, 'Categoria possui subcategorias.')

            const articles = await app.db('articles')
                .where({ categoryId: request.params.id })
            notExistsOrError(articles, 'Categoria possui artigos vinculados.')

            const rowsDeleted = await app.db('categories')
                .where({ id: request.params.id }).del()
            existisOrError(rowsDeleted, 'Categoria não foi encontrada.')

            response.status(204).send()
        } catch (err) {
            response.status(400).send(err)
        }
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (request, response) => {
        app.db('categories')
            .then(categories => response.json(withPath(categories)))
            .catch(err => response.status(500).json({ message: err }))
    }

    const getById = (request, response) => {
        app.db('categories')
            .where({ id: request.params.id })
            .first()
            .then(category => response.status(200).json(category))
            .catch(err => response.status(500).json({ message: err }))

    }

    const toTree = (categories, tree) => {
        if (!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (request, response) => {
        app.db('categories')
            .then(categories => response.json(toTree(withPath(categories))))
            .catch(err => response.status(500).json({ message: err }))
    }

    return { save, remove, get, getById, getTree }
}