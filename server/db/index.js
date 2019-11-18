const mongoose = require('mongoose');
const config = require('../config/config');

const db_uri = config.mongoURI;

function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(db_uri,
            { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, })
            .then((res, err) => {
              if (err) return reject(err);
              console.log('Mockgoose connected');
              resolve();
            })
        })
    } else {
        mongoose.connect(db_uri,
          { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, })
          .then((res, err) => {
            if (err) return reject(err);
            console.log('MongoDB connected');
            resolve();
          })
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };