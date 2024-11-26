require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { sequelize } = require('./models'); 

const discoRoutes = require('./routes/discoRoutes');
const faixaRoutes = require('./routes/faixaRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const generoRoutes = require('./routes/generoRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/discos', discoRoutes);
app.use('/faixas', faixaRoutes);
app.use('/artistas', artistaRoutes);
app.use('/generos', generoRoutes);

app.get('/', (req, res) => {
    res.render('index'); 
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });