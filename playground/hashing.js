const {SHA256} = require('crypto-js'); // hashing function
const jwt = require('jsonwebtoken');
 
var data = {
    id: 10
};

// sign takes object, and secret and will return our token
// Things that make up a token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTU1MDYyOTA0NH0.k29VD8QopPrlT4TmqzFK41Lz5XYoC_m3W2BddsJ-Esw
// FIRST bit: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 = HEADER, stores algorithm used and type (JWT)
// SECOND bit: eyJpZCI6MTAsImlhdCI6MTU1MDYyOTA0NH0 = payload/data, stores the data (issued at timestamp, iat)
// THIRD bit: k29VD8QopPrlT4TmqzFK41Lz5XYoC_m3W2BddsJ-Esw = VERIFY signature(hash), used to verify payload was never changed

var token = jwt.sign(data, '123abc')
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded: ', decoded);

// With JWT, we get two funcitons one for creating and another for verifying

//var message = "I'm a user number three";
//
//var hash = SHA256(message).toString();
//
//console.log(`Message: ${message}`);
//console.log(`hash: ${hash}`);

//var data = {
//    id:  4
//};
//
//// JSON WEB TOKEN JWT
//var token = {
//    data,
//    hash: SHA256(JSON.stringify(data) + 'somesecret').toString() // somesecret is called salting the hash
//}
////salting the hash, so users cannot change the value in the db to something
//
//
//// The person trying to change the token
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
//// going to store the data that may or may not have manipulated
//// we now have a way to make sure our data does not get changed 
//var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString(); // this is were salt comes into play
//
//if (resultHash === token.hash) { // then we know that the data was not tempered with by someone else
//    console.log('Data was not changed')
//} else {
//    console.log('Data was changed, do not trust!') // so don't trust it
//}