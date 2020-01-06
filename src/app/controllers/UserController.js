const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    // Verifica se existe um usuário com o mesmo e-mail
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists ' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }
}

module.exports = new UserController()
