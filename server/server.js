// server.js is responsible only for the routes
require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port =  process.env.PORT || 3000;

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


// trying to get all the todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        // when you pass back an array your locking yourself back
        // if you wanted to add on some custom data or property you cant
        // so pass in an object around todos
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});


// :Id is a variable which will be created, which will be on the request object, we should be able to access it
app.get('/todos/:id', (req, res) => {
    //res.send(req.params);
    var id = req.params.id;
    
   if(!ObjectID.isValid(id)) {
      return res.status(404).send('Cannot find Id');
   }
    
    Todo.findById(id).then((todo) => {     
        if(!todo) {
           return res.status(404).send();
        }
        
        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });  
});


// deleting todo from DB
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    // validation step
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Cannot find id');
    }
    
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) { // if todo is not there in DB
            return res.status(404).send();
        }
        
        //success case
        res.status(200).send({todo});
        
    }).catch((e) => { // error 
        res.status(400).send();
    });
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // make sure users are able to update only the text field and the completed field
    var body = _.pick(req.body, ['text', 'completed']);
    
    // validation step
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Cannot find id');
    }
    
    // trying to update timestamp of update query
    if(_.isBoolean(body.completed) && body.completed) {
        // if its a boolean and its true
        body.completedAt = new Date().getTime(); // return js timestamp, miliseconds of year 1970 midnight
        
    } else {
        // if its not a boolean and its not true 
        body.completed = false;
        body.completedAt = null;
    }
    
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        
        if(!todo) {
            res.status(404).send();
        }
        
        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};