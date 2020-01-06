const express = require('express')

const routes = express.Router()

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')

routes.post('/users', userController.store) // Criar usuárioy
routes.post('/sessions', sessionController.store) // Criar sessão

module.exports = routes
