const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author') // Busca o anúncio e acrescento o author
    const user = await User.findById(req.userId) // Busca o usuário que está fazendo a requisição

    await Mail.sendMail({
      from: '"Gabriel Grazionale" <_1ntegrac0es##2019@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase', // Nome do arquivo localizado em views/emails/purchase.hbs, este caminho foi definido como configuração no Mail.js
      context: {
        user,
        content,
        ad: purchaseAd // ad: purchaseAd esta apenas renomeando purchaseAd para Ad, quando o template for ler na view.
      }
    })

    return res.send()
  }
}
module.exports = new PurchaseController()
