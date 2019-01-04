const env = {
  development: {
    PORT: process.env.PORT || 3000,
  },
  test: {
    // PORT is not needed for testing
  },
}

// set the values above as environment variables
const NODE_ENV = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')
Object.assign(process.env, env[NODE_ENV])
