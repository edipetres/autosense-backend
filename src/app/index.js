const vehicleRouter = require('./vehicles/router')

module.exports = (app) => {
  app.use('/vehicles', vehicleRouter)
}
