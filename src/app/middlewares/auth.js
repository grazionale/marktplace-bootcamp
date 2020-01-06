const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promissify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  // Por padrão, o token vem no seguinte formado: Bearer 9023402387U8HSJFKH82904U598HV893. Então é feito um split, para pegar apenas o token
  const [, token] = authHeader.split(' ')

  try {
    /* Por padrão, a função verify da biblioteca JWT não funciona com async/await, sendo assim, teria que ser usado
    o modelo antigo, passando uma function para a promisse. O Node, oferece um funcionalidade chamada promissify que torna esse método asincrono, possibilitando o uso
    do async/await */
    const decoded = await promissify(jwt.verify(token, authConfig.secret)) // Verifica e descodifica o token

    req.userId = decoded.id // Com o token descodificado, podemos acessar o ID do user que haviamos armazenado quando o token foi gerado

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
