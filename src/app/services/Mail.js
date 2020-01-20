const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')

const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

const transport = nodemailer.createTransport(mailConfig)

transport.use('compile', hbs({ // Configurar como nodemailer lida com os templates de e-mail
  viewEngine: exphbs.create({
    partialsDir: path.resolve(viewPath, 'partials'), // Templates parciais
    defaultLayout: null
  }),
  viewPath,
  extName: '.hbs' // Extensao utilizada par arquivos de template em hbs
}))

module.exports = transport
