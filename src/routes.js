const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store) // Criar usuárioy
routes.post('/sessions', controllers.SessionController.store) // Criar sessão

routes.get('/teste', authMiddleware, (req, res) => { res.json({ ok: true }) })// Criar sessão

module.exports = routes
