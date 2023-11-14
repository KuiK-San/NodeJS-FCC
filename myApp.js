let express = require('express');
let app = express();
require('dotenv').config()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

console.log('Hello World')

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.use('/public',express.static(__dirname + '/public'))

app.get('/', (req, res) =>{

    let absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
    if(process.env.MESSAGE_STYLE == 'uppercase'){

        let obj ={message: 'HELLO JSON'}
        res.json(obj)
    }else{

        let obj ={message: 'Hello json'}
        res.json(obj)
    }
})

app.get('/now', (req, res, next)=>{
    req.time = new Date().toString();
    next()
}, (req, res) =>{
    res.json({time: req.time})
})

app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word})
})

app.route('/name').get( (req, res)=>{
    res.json({name: `${req.query.first} ${req.query.last}` })
}).post((req, res)=>{
    res.json({name: `${req.body.first} ${req.body.last}` })})

























 module.exports = app;
