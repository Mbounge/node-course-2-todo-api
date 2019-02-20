const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


// Override method, to make sure users can only see thier id and email
UserSchema.methods.toJSON = function () { // display to the user
    var user = this;
    var userObject = user.toObject(); // will convert user to an object
    
    return _.pick(userObject, ['_id', 'email'])
};
    
// this keyword stores the individual document
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat({access, token});
    
    return user.save().then(() => {
        return token; // so later on we can grab the token in the server file
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};