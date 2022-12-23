const express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoadmin:secret@localhost:1888/?authMechanism=DEFAULT");

var nameSchema = new mongoose.Schema({
    name: String,
    lastname: String
});
var User = mongoose.model("User", nameSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

app.get('/', function(req, res) {
    res.send('hola');
});

app.post('/test', function (req, res) {
    let data = new User(req.body);
    data.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});