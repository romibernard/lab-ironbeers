const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:
// /beers
app.get("/beers", (req, res) => {
  res.render("beers")
})

// /random-beers
app.get("/random-beer", (req, res) => {
  res.render("random-beer")
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer', { beers: responseFromAPI });
  })
  .catch(error => console.log(error));

})

// /home
app.get("/", (req, res) => {
  res.render('index');
  punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
