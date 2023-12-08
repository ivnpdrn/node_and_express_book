// Import required modules
const express = require('express');
const exphbs = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
  },
});
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const handlers = require('./lib/handlers');
const weatherMiddleware = require('./lib/middleware/weather');

// Create an instance of the Express application
const app = express();

// Configure Handlebars view engine
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Use body-parser middleware for parsing URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Use custom weatherMiddleware
app.use(weatherMiddleware);

// Define routes
app.get('/', handlers.home);
// ... other route handlers ...

// Error handling middleware
app.use(handlers.notFound);
app.use(handlers.serverError);

// Start the server
const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate.`);
  });
} else {
  module.exports = app;
}
