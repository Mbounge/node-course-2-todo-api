// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // object destructuring

var obl = new ObjectID(); // creating a new instance of object id


// MongoDB module v2
// takes two args, 1st: string of url for db location, 2nd: is callback function
// if you wanted to make a new db, just change TodoApp to soemthing different
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB server'); // using return to stop the rest of the function from exe
    }
    console.log('Connected to MongoDB server');
    
    // insertOne takes two args, 1st: what you want to insert in and the callback function
//    db.collection('Todos').insertOne({
//        text: 'Something to do',
//        completed: false
//    }, (err, result) => {
//        if(err) {
//          return console.log('Unable to insert todo', err); // so if someone is looking at the logs they can see what went wrong
//        }
//        
//        // ops stores all documents inserted
//        console.log(JSON.stringify(result.ops, undefined, 2)); // undefined for filter function and 2 is for indentation
//    });
//    
//    db.close(); // closes the connnection with the mongo db server
    
    db.collection('Users').insertOne({
        name: 'Sam',
        age: 66,
        location: 'Canada'
    }, (err, result) => {
        if(err) {
            return  console.log('Unable to insert User', err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    
    db.close();
});


// MongoDB module v3

//MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
//    if(err) {
//      return  console.log('Unable to connect to MongoDB server'); // using return to stop the rest of the function from exe
//    }
//    console.log('Connected to MongoDB server');
//    db = client.db('TodoApp')
//   
//    db.collection('Todos').insertOne({
//        text: 'Something to do',
//        completed: false
//    }, (err, result) => {
//        if(err) {
//          return console.log('Unable to insert todo', err); // so if someone is looking at the logs they can see what went wrong
//        }
//        
//        // ops stores all documents inserted
//        console.log(JSON.stringify(result.ops, undefined, 2)); // undefined for filter function and 2 is for indentation
//    });
//    
//    client.close(); // closes the connnection with the mongo db server   
//});