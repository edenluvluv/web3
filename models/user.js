//user.js
const uri = "mongodb+srv://kamila:Sxx1LoKxE5baQ@cluster0.qje0zfw.mongodb.net/lab2?retryWrites=true&w=majority";
const mongoose = require('mongoose');

const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

mongoose.connect(uri, clientOptions);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');

    mongoose.connection.db.admin().command({ping: 1}, (err, result) => {
        if (err) {
            console.error('Error pinging MongoDB:', err);
        } else {
            console.log('MongoDB ping successful:', result);
        }
    });
});

const User = mongoose.model('users', {
    username: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date,
    userID: String,
    deletedAt: Date
});

module.exports = User