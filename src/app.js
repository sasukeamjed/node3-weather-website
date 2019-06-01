const path = require('path');

const express = require('express');
const app = express();

const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');




//Define Paths for express config
const publicDirctoryPath = path.join(__dirname, '../public');
/*
you can create views folder as a defualt path for handlebars templates
but if we want to make another  folder with diffrent name we have the create a path first like the following
*/
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirctoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amjed Al anqoodi',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amjed Al anqoodi',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help HandleBars Page',
        title: 'Help',
        name: 'Amjad Al anqoodi'
    });
});

// app.get('/help', (req, res) => {
//     res.send('Help');
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Adress has to be provided',
        });
    }
    geoCode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error,
            });
        }
        forecast(response.latitude, response.longitude, (error, forcastData) => {
            if (error) {
                res.send({
                    error: error,
                });
            } else {
                res.send({
                    forecast: forcastData,
                    location: response.location,
                    address: req.query.address,
                });
            }
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        error: 'Help Article Not Found',
        title: 'Error',
        name: 'Amjad Al anqoodi'
    });
});

app.get('*', (req, res) => {
    res.render('404_page', {
        error: 'Page Not Found',
        title: 'Error',
        name: 'Amjad Al anqoodi'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

