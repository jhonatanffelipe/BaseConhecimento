import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    incoPack: 'fontawsome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realida com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops... Erro inesperado.' : payload.msg,
    { type: 'error', icon: 'times' }
)