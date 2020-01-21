const Mail = require('../services/Mail')

class PurchaseMail {
  get key () { // O get serve para que, quando utilizarmos o PurchaseMail, conseguimos acessar o key.. ex: PurchaseMail.key
    return 'PurchaseMail'
  }

  async handle (job, done) { // Responsável pelo envio de e-mail
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Gabriel Grazionale" <_1ntegrac0es##2019@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase', // Nome do arquivo localizado em views/emails/purchase.hbs, este caminho foi definido como configuração no Mail.js
      context: {
        user,
        content,
        ad: ad // ad: purchaseAd esta apenas renomeando purchaseAd para Ad, quando o template for ler na view.
      }
    })

    return done() // Avisa o job que foi finalizado
  }
}

module.exports = new PurchaseMail()
