const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));     // Localizacion directorio partials



// home route
app.get('/', (req, res) => {
  res.render('index');
});


// beers route
console.log(punkAPI);
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', {
        beersFromApi
      });
    })
    .catch(error => console.log(error));
});

// random beer route
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(response => {
      console.log(response);
      res.render('random-beer.hbs', { response });
    })
    .catch(error => {
      console.log(error);
    });
});


//beers by id route
app.get('/beers/:id', (req, res) => {
  console.log('entrando iteracion 6');

  let { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(response => {
      res.render('beer-id.hbs', {
        response
      });
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
