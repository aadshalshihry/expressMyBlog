const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true, index: true},
    passwordHash: {type: String, required: true},
    brithDate: {type: Date}
}, {timestamps: true});

// Check if the password is valid
schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

// Set passwordHash
// 10 is the salt. in product make it long, random & unique
schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

module.exports = mongoose.model('User', schema);