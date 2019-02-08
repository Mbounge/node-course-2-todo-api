const {MongoClient, ObjectID} = require('mongodb'); // object destructuring

// MongoDB module v2
// takes two args, 1st: string of url for db location, 2nd: is callback function
// if you wanted to make a new db, just change TodoApp to soemthing different
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB server'); // using return to stop the rest of the function from exe
    }
    console.log('Connected to MongoDB server');
    
    // deleteMany
//    db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
//        console.log(result);
//    });
    // deleteOne
//    db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
//        console.log(result);
//    });
    // findOneAndDelete
//    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//        console.log(result);
//    });
    
    
//    db.collection('Users').deleteMany({name: 'Bo'}).then((result) => {
//       console.log(result); 
//    });
    
    db.collection('Users').
    findOneAndDelete({_id: new ObjectID("5c5c4d61f0859422aca73f5a")}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    // db.close();
});


