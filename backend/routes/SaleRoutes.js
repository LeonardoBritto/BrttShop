const router = require('express').Router()

const SaleController = require('../controllers/SaleController')

const verifyToken = require('../helpers/verify-token')

router.post('/create',          verifyToken, SaleController.create)

module.exports = router