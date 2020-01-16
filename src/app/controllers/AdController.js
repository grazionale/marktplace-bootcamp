const Ad = require('../models/Ad')
class AdController {
  async index (req, res) { // listagem de N items
    const ads = await Ad.paginate({}, { // Quando não utilizar paginação, usar o método find()
      page: req.params.page || 1,
      limit: 20,
      sort: '-createdAt',
      populate: ['author'] // Populate serve para mostrar os dados do author que estão vinculados a este Ad
    })

    return res.json(ads)
  }

  async show (req, res) { // listagem de um único item
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }

  async store (req, res) { // criar um Ad
    /**
     *Pega todas as informações do body, e substitui o author pelo userId da
     request que foi gerado pelo middle de autenticação
     */
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update (req, res) { // edição
    /**
     * Busca o Ad através do ID, faz a atualização no banco de dados com o
     * conteúdo do body e flag como new para que o objeto ad seja atualizado
     * e visualizado na resposta
     */
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ad)
  }

  async destroy (req, res) { // deletar
    await Ad.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
