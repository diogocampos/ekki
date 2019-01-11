const localMongoDB = 'mongodb://localhost:27017/Ekki'

const randomSecret = () => Math.random().toString(26).slice(2) //prettier-ignore

const env = {
  development: {
    PORT: process.env.PORT || 3001,
    MONGODB_URI: localMongoDB,
    JWT_SECRET: randomSecret(),
  },
  test: {
    // PORT is not needed for testing
    MONGODB_URI: localMongoDB,
    JWT_SECRET: randomSecret(),
  },
  production: {
    // PORT is set by Heroku
    // MONGODB_URI is set by Heroku
    JWT_SECRET: 'secret',
  },
}

// set the values above as environment variables
const NODE_ENV = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')
Object.assign(process.env, env[NODE_ENV])
