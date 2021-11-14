const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb+srv://admin:pass@cluster0.4b2eg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}
//creating database schema
var Schema = mongoose.Schema;
var movieSchema = new Schema({Title: String,
    Year: String,
    Poster: String
    })
//use schema to create movie database model
var MovieModel = mongoose.model('movie', movieSchema);
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);
    MovieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
        });
        res.send('Item added');
})
//read data from database, then display on app
app.get('/api/movies', (req, res, next) => {
    MovieModel.find(function (err, data) {
    console.log(data);
    res.json(data);
    });
    })
//reads id from database in server
app.get('/api/movies/:id', (req, res, next) => {
    console.log(req.params.id);
    MovieModel.findById(req.params.id,
    function (err, data) {
    res.json(data);
    });
    })  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})