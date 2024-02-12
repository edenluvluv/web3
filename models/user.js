//user.js
const uri = "mongodb+srv://kamila:Sxx1LoKxE5baQ@cluster0.qje0zfw.mongodb.net/lab2?retryWrites=true&w=majority";

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect();


const db =client.db("lab2")
const User= db.collection("users")

module.exports = User;
