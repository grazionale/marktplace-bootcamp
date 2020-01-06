const server = require('./server')

server.lister(5000 || process.env.PORT)
