const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store) // Criar usuário
routes.post('/sessions', controllers.SessionController.store) // Criar sessão

routes.get('/teste', authMiddleware, (req, res) => { res.json({ ok: true }) })// Criar sessão

routes.use(authMiddleware) // Todas as rotas desta linha para baixo irá passar pelo authMiddleware que verifica se o user está logado

/**
 * Ads
 */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/*
* Purchases
*/
routes.post('/purchase', controllers.PurchaseController.store)

module.exports = routes
