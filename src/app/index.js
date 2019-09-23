const vehicleRouter = require('./vehicles/router')


module.exports = (app) => {
  app.use('/vehicles', vehicleRouter)

  app.get('/status', (req, res) => {
    res.send('OK!')
  })
}