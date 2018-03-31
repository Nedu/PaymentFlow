const express = require('express');
const stripe = require('stripe')('sk_test_Xh65Kx3U5l4YwWgN3Ha9sXnP');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();



// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});