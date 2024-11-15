const sequelize = require('./database');

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso!');
    })
    .catch((err) => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });