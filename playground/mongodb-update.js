const {MongoClient, ObjectID} = require('mongodb'); // object destructuring

// MongoDB module v2
// takes two args, 1st: string of url for db location, 2nd: is callback function
// if you wanted to make a new db, just change TodoApp to soemthing different
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB server'); // using return to stop the rest of the function from exe
    }
    console.log('Connected to MongoDB server');
    
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5c5b9cf1f1e998ea9f4f5770')
//    }, {
//        $set: { // update operator
//            completed: true
//        }
//    }, {
//        returnOriginal: false
//    }).then((result) => {
//        console.log(result);
//    });
    
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c5c4d85336ace22adb261fe')
    }, {
        $set: {
            location: 'Zimbabwe'
        },
        $inc: {
            age: -44
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});