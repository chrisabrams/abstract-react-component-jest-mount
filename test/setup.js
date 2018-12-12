process.on('uncaughtException', function(e) {
  console.error(e)
})

process.on('unhandledRejection', function(e) {
  console.error(e)
})

import chai from 'chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-for-chai'

chai.use(jsxChai)
chai.use(sinonChai)
chai.use(chaiJestSnapshot)
chai.config.includeStack = true
