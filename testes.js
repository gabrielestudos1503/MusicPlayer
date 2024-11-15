const Disco = require('./models/discoModel');   
const Artista = require('./models/artistaModel');
const Faixa = require('./models/faixaModel');  
const Genero = require('./models/generoModel'); 

Artista.create({ nome: 'Milton', genero: 'Rock' })
  .then((artista) => {
    return Genero.create({ nome: 'Rock' }).then((genero) => {
      return Disco.create({
        titulo: 'Disco do Milton',
        dataLanc: new Date('2024-11-15'),
        capa: 'capa.jpg',
      }).then((disco) => {
        // Criando as faixas
        const faixas = ['Faixa 1', 'Faixa 2'].map(nomeFaixa => {
          return Faixa.create({ nome: nomeFaixa }).then(faixa => disco.addFaixa(faixa));
        });

        // Associando disco ao artista e gênero
        Promise.all(faixas).then(() => {
          disco.addArtista(artista);  // Associando o artista ao disco
          disco.addGenero(genero);    // Associando o gênero ao disco

          console.log('Disco, Artista, Gênero e Faixas criados e associados com sucesso!');
        });
      });
    });
  })
  .catch((err) => {
    console.error('Erro ao criar os registros:', err);
  });
