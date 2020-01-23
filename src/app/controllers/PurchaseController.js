const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail') // Job
const Queue = require('../services/Queue') // Fila
const Purchase = require('../models/Purchase')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author') // Busca o anúncio e acrescento o author
    const user = await User.findById(req.userId) // Busca o usuário que está fazendo a requisição

    const purchase = await Purchase.create(req.body)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save() // Salva o Job no Redis

    return res.json(purchase)
  }

  async index (req, res) {
    const purchases = await Purchase.paginate({}, { // Quando não utilizar paginação, usar o método find()
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt'
    })

    return res.json(purchases)
  }

  async show (req, res) {
    const purchase = await Purchase.findById(req.params.id)

    return res.json(purchase)
  }
}
module.exports = new PurchaseController()
