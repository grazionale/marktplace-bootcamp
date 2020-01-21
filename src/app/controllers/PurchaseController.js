const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail') // Job
const Queue = require('../services/Queue') // Fila

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author') // Busca o anúncio e acrescento o author
    const user = await User.findById(req.userId) // Busca o usuário que está fazendo a requisição

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save() // Salva o Job no Redis

    return res.send()
  }
}
module.exports = new PurchaseController()
