const express = require('express')

const routes = express.Router()

const userController = require('./app/controllers/UserController')

routes.post('/users', userController.store) // Criar usuárioy

module.exports = routes
