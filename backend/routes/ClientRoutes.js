const router = require('express').Router()

const ClientController = require('../controllers/ClientController')

const verifyToken = require('../helpers/verify-token')

router.post('/create',          ClientController.create)
router.patch('/update/:id',     verifyToken,    ClientController.update)
router.delete('/delete/:id',    verifyToken, ClientController.delete)
router.post('/login',           ClientController.login)
router.get('/:id',              verifyToken, ClientController.getById)
router.get('/',                 verifyToken, ClientController.getAll)

module.exports = router