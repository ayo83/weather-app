const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const publicPath = path.join(__dirname, '../public');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup the static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res)=>{
    res.render('index')
});

app.get('/about', (req, res)=>{
    res.render('about')
});

app.get('/help', (req, res)=>{
    res.render('help')
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({ error})
            }

            res.send({
                longitude,
                latitude,
                summary: forecastData.summary,
                temperature: forecastData.temperature,
                location,
                address: req.query.address
            })
        })
    })

});


app.get('./products', (req, res)=>{
    res.send({
        products: []
    })
})



app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage: 'Sorry, an error has occured, Requested page not found!'
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errorMessage: 'Help article not found!'
    });
});


const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`);
});