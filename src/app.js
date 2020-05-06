const path = require('path')
const express= require('express')    //As express is a function, so the variable express will be a function
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const weather= require('./utils/weather_finder')

// console.log(__dirname)
// console.log(path.join (__dirname,'../public'))        --tochange the directory using path function

const app= express()                 // call the express function to create a new express application

const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join (__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saurabh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Saurabh'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        name: 'Saurabh kumar',
        title: 'Help'
    })
})

// app.get('', (req,res) =>{
//     res.send('Hello Express')
// })

// app.get('/help',(req,res) => {
//     res.send('help Page')
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>Title</h1>')
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({
                error,
            })
        }
        weather(data.latitude,data.longitude,(error,weather_data) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                Location: data.location,
                weather_data,
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404-Page',
        name: 'Saurabh Kumar',
        message: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404-Page',
        name: 'Saurabh Kumar',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})