import args from './args'
import Services from './services/'

const printUsage = () => {
  console.log('Usage:')
  console.log('\t ./crypto-client rest-http encrypt <clear-string> // uses REST HTTP')
  console.log('\t ./crypto-client rest-http decrypt <encrypted-string> // uses REST HTTP')
  console.log('\t ./crypto-client json-rmq encrypt <clear-string> // uses RabbitMQ')
  console.log('\t ./crypto-client json-rmq decrypt <encrypted-string> // uses RabbitMQ')
  process.exit(-1)
}

const params = args()
if (!params) {
  printUsage()
}

const Service = Services[params.protocol]
if (!Service) {
  printUsage()
}

const service = new Service()
const method = service[params.method]
if (!method) {
  printUsage()
}

service.start()
  .then(() => service[params.method](params.data))
  .then(console.log)
  .catch(console.error)
  .then(() => service.stop())
