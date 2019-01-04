const mongoose = require('mongoose')

mongoose.connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})
