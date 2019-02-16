const {objectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
}); 

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findOneAndRemove("asas").then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove({_id: '553751736e1t2fcvc282'}).then((todo) => {
    console.log(todo);
});