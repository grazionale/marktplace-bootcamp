const kue = require('kue')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

/**
 * Toda vez que o Node identificar que existe uma ação na fila que chama essa key, então ele dispara o handle.
 */
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

Queue.on('error', Sentry.captureException) // Quando ocorrer um erro dentro da fila, o Sentry tb vai capturar

module.exports = Queue
