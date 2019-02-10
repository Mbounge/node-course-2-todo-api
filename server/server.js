// server.js is rsponsible only for the routes
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json()); // middleware

// for resource creation
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc); // send doc back
    }, (e) => {
        res.status(400).send(e); // will send error back, status 400 is bad request
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};