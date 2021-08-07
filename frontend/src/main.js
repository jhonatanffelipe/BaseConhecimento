import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'

import './config/msg'
import './config/bootstrap'

Vue.config.productionTip = false

//TEMPORÁRIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Imp1bGlhIiwiZW1haWwiOiJqdWxpYUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjI4MjkzMjI0LCJleHAiOjE2Mjg1NTI0MjR9.ncBhOSlvlOQNcdhEKkIL2zLSpER7ubmv_VG0HWluwzc'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
