const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // console.log('authHeader', authHeader)

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  // Por padrão, o token vem no seguinte formado: Bearer 9023402387U8HSJFKH82904U598HV893. Então é feito um split, para pegar apenas o token
  const [, token] = authHeader.split(' ')
  // console.log('token', token)

  try {
    const decoded = await jwt.verify(token, authConfig.secret) // Verifica e descodifica o token
    console.log('aqui')
    console.log('decoded', decoded)
    req.userId = decoded.id // Com o token descodificado, podemos acessar o ID do user que haviamos armazenado quando o token foi gerado
    console.log('req.userId', req.userId)
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Token invalid' })
  }
}
