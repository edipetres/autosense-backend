require('./model')
const router = require( "express" ).Router();
const controller = require('./controller')

router.get('/', controller.getAllVehicles)

module.exports = router