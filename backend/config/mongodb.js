const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/base_conhecimento', { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(e => {
        console.log(`❌ Erro: Não foi passivel conectar com o mongodb! ${e}`);
    })