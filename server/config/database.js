module.exports = {
  mongo: {
    host: 'localhost',
    port: '27017',
    database: process.env.MODE === 'production' ? 'plearn' : 'plearn_test'
  }
}
