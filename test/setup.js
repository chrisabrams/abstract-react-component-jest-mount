process.on('uncaughtException', function(e) {
  console.error(e)
})

process.on('unhandledRejection', function(e) {
  console.error(e)
})

const chai  = require('chai')
const chaiJestSnapshot = require('chai-jest-snapshot')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)
chai.use(chaiJestSnapshot)
chai.config.includeStack = true
