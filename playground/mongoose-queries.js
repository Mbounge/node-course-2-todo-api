const {objectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c5de8a40dc8ebd32a63fae3';

//if (!objectID.isValid(id)) {
//    console.log('ID not valid');
//}

//Todo.find({
//    _id: id
//}).then((todos) => {
//    console.log('todos', todos);
//});
//
//// returns one doc at most
//Todo.findOne({
//    _id: id
//}).then((todo) => {
//    console.log('todo', todo);
//});

// if your looking for an object by its identifier
// Tolearn more go to queries doc in mongoose site
//Todo.findById(id).then((todo) => {
//    if (!todo) {
//        return console.log('Id not found');
//    }
//    console.log('todo by id', todo);
//}).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    // better way of getting the results from the console
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

