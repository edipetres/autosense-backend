require('./model')
const router = require( "express" ).Router();
const controller = require('./controller')

// Route: /vehicles/..
router.get('/', controller.getAllVehicles)
router.put('/:id', controller.updateVehicle)

module.exports = router