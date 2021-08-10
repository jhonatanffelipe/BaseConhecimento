import axios from 'axios'

const success = response => response

const error = err => {
    if (401 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}


axios.interceptors.response.use(success, error)