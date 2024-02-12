//user.js
const mongoose = require('mongoose');

const uri = "mongodb+srv://kamila:Sxx1LoKxE5baQ@cluster0.qje0zfw.mongodb.net/lab2?retryWrites=true&w=majority";

mongoose.connect(uri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userID: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    isAdmin: { type: Boolean, default: false }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
