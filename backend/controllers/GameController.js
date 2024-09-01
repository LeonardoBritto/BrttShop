const Game = require('../models/Game')

module.exports = class GameController {
    static async create(req, res) {
        const {name, price, plataform, category} = req.body

        if(!name)
            return res.status(400).json({message: 'Name must be provided!'})

        if(!price)
            return res.status(400).json({message: 'Price must be provided!'})

        if(!plataform)
            return res.status(400).json({message: 'Plataform must be provided!'})

        if(!category)
            return res.status(400).json({message: 'Category must be provided!'})
        
       try {
            const game = {id: 0, name, price, plataform, category}
            await Game.create(game)
            res.status(201).json({message: 'Game created successfully!'})
       } catch (error) {
        res.status(500).json({message: error})
       } 
    }

    static async update(req, res) {
        const {name, price, plataform, category} = req.body
        const id = req.params.id

        if(!name)
            return res.status(400).json({message: 'Name must be provided!'})

        if(!price)
            return res.status(400).json({message: 'Price must be provided!'})

        if(!plataform)
            return res.status(400).json({message: 'Plataform must be provided!'})

        if(!category)
            return res.status(400).json({message: 'Category must be provided!'})
        
       try {
            const game = {name, price, plataform, category}
            await Game.update(game, {where: {id: id}})
            res.status(201).json({message: 'Game updated successfully!'})
       } catch (error) {
        res.status(500).json({message: error})
       }    
    }

    static async delete(req, res) {
        const id = req.params.id

        try {
            await Game.destroy({where: {id: id}}) 
            res.status(201).json({message: 'Game deleted successfully!'})  
        } catch (error) {
            res.status(500).json({message: error})    
        }
    }

    static async getById(req, res) {
        const id = req.params.id
    
        const gameExist = await Game.findByPk(id, {attributes: {exclude: ['createdAt', 'updatedAt']}})

        if(!gameExist)
            return res.status(400).json({message: 'Game not found!'})    

        res.status(201).json({game: gameExist})   
    }

    static async getAll(req, res) {
        const games =  await Game.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})

        if(games.length === 0)
            return res.status(400).json({message: 'There are no games in the database!'}) 

        res.status(201).json({games: games})
    }
}