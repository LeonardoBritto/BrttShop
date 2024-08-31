const router = require('express').Router()

const ClientController = require('../controllers/ClientController')

router.post('/create',          ClientController.create)
router.patch('/update/:id',     ClientController.update)
router.delete('/delete/:id',    ClientController.delete)
router.post('/login',           ClientController.login)
router.get('/:id',              ClientController.getById)
router.get('/',                 ClientController.getAll)

module.exports = router