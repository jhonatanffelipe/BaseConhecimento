module.exports = app => {
    function existisOrError(value, message) {
        if (!value) {
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
        } catch (error) {
            return
        }
    }

    function equalsOrError(valueA, valueB, message) {
        if (valueA !== valueB) {
            throw message
        }

    }

    return { equalsOrError, notExistsOrError, existisOrError }
}