const express = require('express')
const validate = require('express-validation') // Biblioteca - middleware, para validação de schemas
const handle = require('express-async-handler') // Biblioteca para enviar o erros ao exception handler
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/users', validate(validators.User), handle(controllers.UserController.store)) // Criar usuário
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store)) // Criar sessão

routes.get('/teste', authMiddleware, (req, res) => { res.json({ ok: true }) })// Criar sessão

routes.use(authMiddleware) // Todas as rotas desta linha para baixo irá passar pelo authMiddleware que verifica se o user está logado

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/*
* Purchases
*/
routes.post('/purchase', validate(validators.Purchase), handle(controllers.PurchaseController.store))

module.exports = routes
