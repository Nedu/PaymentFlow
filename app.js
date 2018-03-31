const express = require('express');
const stripe = require('stripe')('sk_test_Xh65Kx3U5l4YwWgN3Ha9sXnP');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

/* Middlewares */

// Handlebars Middleware
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});