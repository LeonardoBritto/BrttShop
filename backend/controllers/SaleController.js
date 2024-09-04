const Sale = require('../models/Sale')
const Detail = require('../models/Detail')
const Client = require('../models/Client')

module.exports = class SaleController {
    static async create(req, res) {
        const {discount, clientId, brttPoints, games} = req.body
        var total = 0

        for (const game of games) {            
            total = total + (game.price * game.quantity)
        }

        const client = await Client.findByPk(clientId)

        const totalPaid = total - discount - (brttPoints / 100)
        const brttPointsAtual = totalPaid
        if(client.balance < totalPaid)
            return res.status(400).json({message: 'Customer has no balance'})
        
        const balance = client.balance - (total - discount)
        
        try {          
            var sale = {id: 0, totalSale: total, discount, totalPaid, clientId}
            sale = await Sale.create(sale)  
            
            for (const l of games) {
                const detail = {id: 0, quantity: l.quantity, total: l.quantity * l.price, saleId: sale.id, gameId: l.gameId}
                await Detail.create(detail)
            }

            await Client.update({balance, brttPointsAtual}, {where: {id: clientId}})
            res.status(201).json({message: 'Sale created successfully!'})  
        } catch (error) {
            res.status(500).json({message: error})    
        }        
    }
}