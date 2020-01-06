const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // Todos e-mails são salvos em caixa baixa
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/* Hook para acontecer antes de uma ação, neste caso, a ação save, que é executada quando uma informação está sendo
atualizada ou salva */
UserScheme.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8) // encriptando a senha com bcrypt
})

UserScheme.methods = { // Objeto com todos os método que o User possuí
  compareHash (password) { // Valida se a senha sem fornecida por parâmetro, é equivalente a senha criptografada do bd
    return bcrypt.compare(password, this.password)
  }
}

UserScheme.statics = { // Métodos estáticos só podem ser chamados dentro do próprio User, e não através de uma instância de usuário como (new User())
  generateToken ({ id }) { // Recebe um user e através da desistruturação está pegando apenas o id
    return jwt.sign(
      { id }, // Este objeto recebe quantas e quaisquer informações que você queira para utilizar dentro da criptografia do token
      authConfig.secret, // Secret - informação única, que torna este token exclusivo desta aplicação
      { expiresIn: authConfig.ttl }) // Tempo para o token expirar em milissegundos
  }
}

module.exports = mongoose.model('User', UserScheme)
