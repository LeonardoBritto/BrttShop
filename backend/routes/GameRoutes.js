const router = require('express').Router()

const GameController = require('../controllers/GameController')

const verifyToken = require('../helpers/verify-token')

router.post('/create',          verifyToken, GameController.create)
router.patch('/update/:id',     verifyToken, GameController.update)
router.delete('/delete/:id',    verifyToken, GameController.delete)
router.get('/:id',              verifyToken, GameController.getById)
router.get('/',                 verifyToken, GameController.getAll)

module.exports = router