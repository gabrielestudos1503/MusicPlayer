const sequelize = require('./config/database'); 
const Disco = require('./models/discoModel');   
const Artista = require('./models/artistaModel');
const Faixa = require('./models/faixaModel');  
const Genero = require('./models/generoModel'); 

sequelize.sync()
  .then(() => {
    console.log("Tabelas sincronizadas!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });