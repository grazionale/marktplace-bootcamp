const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose.connect(databaseConfig.uri, { // URI de conexão
      useCreateIndex: true, // Apenas informa ao mongoose que está sendo utilizado uma versão mais recente do Node, então ele faz algumas adaptações
      useNewUrlParser: true // Apenas informa ao mongoose que está sendo utilizado uma versão mais recente do Node, então ele faz algumas adaptações
    })
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
