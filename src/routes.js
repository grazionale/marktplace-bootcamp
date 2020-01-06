const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')

routes.post('/users', userController.store) // Criar usuárioy
routes.post('/sessions', sessionController.store) // Criar sessão

routes.get('/teste', authMiddleware, (req, res) => { res.json({ ok: true }) })// Criar sessão

module.exports = routes
