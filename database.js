const { ObjectID } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://master:pass@main.jzhkr.mongodb.net/main?retryWrites=true&w=majority";

//Node monule used to hand errors when running code

const state = {
  db: null,
  collection: null
};


const client = new MongoClient(uri, { useNewUrlParser: true });

const connect = (cb) => {
  if (state.db && state.users) {
    cb();
  } else {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log(err)
        cb(err);
      } else {
        // Change the database name here and collection name here
        state.db = client.db("main");
        state.collection = state.db.collection("users");
        cb();
      }
    })
  }
}


const getPrimarykey = (key) => {
  return ObjectID(key)
}

const getDB = () => {
  return state.db;
}
const getCollection = () => {
  return state.collection;
}



module.exports = { getDB, getCollection, connect, getPrimarykey }