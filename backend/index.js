const express = require('express')
const consign = require('consign')

const app = express()

consign()
    .then('./config/middlewares.js')
    .then('./api/user.js')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('🚀 Backend executando...');
})