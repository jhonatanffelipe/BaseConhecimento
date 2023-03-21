const mongoose = require("mongoose");
mongoose
  .connect("mongodb://172.17.0.3/base_conhecimento", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((e) => {
    console.log(`❌ Erro: Não foi passivel conectar com o mongodb! ${e}`);
  });
