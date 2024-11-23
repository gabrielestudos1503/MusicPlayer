const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const discoRoutes = require('./routes/discoRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const generoRoutes = require('./routes/generoRoutes');
const faixaRoutes = require('./routes/faixaRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/discos', discoRoutes);
app.use('/artistas', artistaRoutes);
app.use('/generos', generoRoutes);
app.use('/faixas', faixaRoutes);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

sequelize.sync({ alter: true }).then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
