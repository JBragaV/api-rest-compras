const mongoose = require('../config/db/database');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome:{type: 'string', require: true},
    senha:{type: 'string', require: true, select: false}
}, {versionKey: false});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;