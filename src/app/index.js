const vehicleRouter = require('./vehicles/router')


module.exports = (app) => {
  app.use('/vehicle', vehicleRouter)

  app.get('/status', (req, res) => {
    res.send('OK!')
  })
}