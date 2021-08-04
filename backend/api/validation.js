module.exports = app => {
    function existisOrError(value, message) {
        if (!value || value == 0) {
            throw message
        }
        if (Array.isArray(value) && value.length === 0) {
            throw message
        }
        if (typeof value === 'string' && !value.trim()) {

            throw message
        }
    }

    function notExistsOrError(value, message) {
        try {
            existisOrError(value, message)
        } catch (err) {
            return
        }
        throw message
    }

    function equalsOrError(valueA, valueB, message) {
        if (valueA !== valueB) throw message
    }

    return { existisOrError, notExistsOrError, equalsOrError }
}