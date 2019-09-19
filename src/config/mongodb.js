const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL

// Connect to MongoDB with Mongoose
module.exports = async function (app) {
  if (!mongoUrl) {
    return new Error('Missing MongoDB connection string.')
  }

  try {
    await mongoose.connect(mongoUrl,  { useNewUrlParser: true })
  } catch (reason) {
    console.log('Unable to connect to the MongoDB instance. Error: ', reason);
  }
  mongoose.Promise = global.Promise

  process.on("SIGINT", cleanUp);
  process.on("SIGTERM", cleanUp);
  process.on("SIGHUP", cleanUp);

  if (app) {
    app.set('mongoose', mongoose)
  }
}

function cleanUp() {
  mongoose.connection.close(function () {
    process.exit(0)
  })
}