const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const validate = require('express-validation')
const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
    this.exception() // Obrigatório vir depois das rotas
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

  // Handler Exception
  exception () {
    /**
     * Quando um middleware possuí 4 parâmetros, o primeiro passa ser o erro,
     * e o express entende que esse middleware é para tratamento de erros.
     * No caso abaixo, sempre q haver um erro na API, esse midleware será
     * executado
     */
    this.express.use(async (err, req, res, next) => {
      /**
       * Se for um erro de validação, entao retorna o erro em formado JSON
       */
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)

        /**
         * É possível retornar o erro em formado JSON e também em HTML,
         * para retornar em JSON usar: return res.json(await youch.toJSON())
         */
        return res.send(await youch.toHTML())
      }
      /**
       * Se ñ houve um status, então retorna-se 500.
       */
      return res.status(err.status || 500).json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
