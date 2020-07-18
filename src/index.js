const express = require("express"),
      app     = express(),
      path    = require("path"),
      hbs     = require("hbs"),
      geocode = require("./utils/geocode"),
      forecast = require("./utils/forecast");

      const port = process.env.PORT || 3333

app.use(express.static(path.join(__dirname,'../public')));
const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');



app.set('view engine','hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Gagan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gagan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact',
        message: 'For further updates contact us :-10000000'
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Must provide address"
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send(error)
        };
        forecast(longitude, latitude, (error, forecastdata) => {
            if (error) {
                return res.send(error)
            };
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            });
        })
    });
});

app.get('/products',(req,res)=>{
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        error: "Help article not found",
        title:"404"
    });
});

app.get("*",(req,res)=>{
    res.render("error",{
        title:"404",
        error: "this page is not found 404"
    });
});

app.listen(port,()=>{
    console.log("Server Setup")
});