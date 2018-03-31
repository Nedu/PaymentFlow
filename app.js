const express = require('express');
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

/* Middlewares */

// Handlebars Middleware
app.engine('handlebars', expressHandlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Setup Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
    res.render('index', {
      stripePublishableKey: keys.stripePublishableKey,
    });
});

// Charge Route
app.post('/charge', (req, res) => {
    const amount = 2500;

    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken 
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Adventure Corp Product',
        currency: 'usd',
        customer: customer.id,
        receipt_email: customer.email
    }))
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});