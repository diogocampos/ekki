const localMongoDB = 'mongodb://localhost:27017/Ekki'

const env = {
  development: {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: localMongoDB,
  },
  test: {
    // PORT is not needed for testing
    MONGODB_URI: localMongoDB,
  },
}

// set the values above as environment variables
const NODE_ENV = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')
Object.assign(process.env, env[NODE_ENV])
