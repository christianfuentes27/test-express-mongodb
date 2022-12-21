const express = require("express");
var bodyParser = require('body-parser');
const app = express();
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoadmin:secret@localhost:1888/?authMechanism=DEFAULT");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
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
    // res.send(data);
});