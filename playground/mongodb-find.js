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
    
//   db.collection('Todos').find({
//       __id: new ObjectID('5c5b40813e8ae11f39d97307'); // this will work
//   }).toArray().then((docs) => { // returns a promise
//       console.log('Todos');
//       console.log(JSON.stringify(docs, undefined, 2));
//   }, (err) => {
//       console.log('Unable to fetch todos', err);
//   });
    
//    db.collection('Todos').find().count().then((count) => { // returns a promise
//       console.log(`Todos count: ${count}`);
//   }, (err) => {
//       console.log('Unable to fetch todos', err);
//   });
    
   db.collection('Users').find({name: 'Bo'}).count().then((count) => {
       console.log(`Users count: ${count}`);
   }, (err) => {
       console.log('Unable to fetch Users');
   }); 

    
    // db.close();
});


