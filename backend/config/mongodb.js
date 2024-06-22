const { mongoConnect } = require("../.env");

const mongoose = require("mongoose");
mongoose
  .connect(mongoConnect, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((e) => {
    console.log(`❌ Erro: Não foi passivel conectar com o mongodb! ${e}`);
  });
