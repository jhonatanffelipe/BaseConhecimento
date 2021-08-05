const express = require('express')
const consign = require('consign')

const app = express()


const db = require('./config/db')

app.db = db


consign()
    .then('./config/middlewares.js')
    .then('./api/auth.js')
    .then('./api/validation.js')
    .then('./api/user.js')
    .then('./api/category.js')
    .then('./api/article.js')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('🚀 Backend executando...');
})