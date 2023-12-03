const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Create an instance of express-handlebars
const hbs = exphbs.create();

// Configure Handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('home.handlebars'));

app.get('/about', (req, res) => res.render('about.handlebars'));

// Custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// Custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`));
