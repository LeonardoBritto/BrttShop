const Client = require('../models/Client')
const createTokenClient = require('../helpers/create-token-client')

module.exports = class ClientController {
    static async create(req, res) {
        const {name, user, email, password} = req.body

        if(!name) 
            return res.status(400).json({message: 'Name must be provided!'})

        if(!user)
            return res.status(400).json({message: 'User must be provided!'})

        if(!email)
            return res.status(400).json({message: 'E-mail must be provided!'})
        
        const userExist = await Client.findOne({where: {user: user}})

        if(userExist)
            return res.status(400).json({message: 'User already exists!'})

        const emailExist = await Client.findOne({where: {email: email}})

        if(emailExist)
            return res.status(400).json({message: 'E-mail already exists!'})

        if(!password)
            return res.status(400).json({message: 'Password must be provided!'})

        try {
            const client = {id: 0, name, user, email, password, balance: 0.0, brttPoints: 0.0}
            await Client.create(client)
            res.status(201).json({message: 'Client created successfully!'})            
        } catch (error){
            res.status(500).json({message: error})
        }
    }

    static async update(req, res) {
        const {name, user, email, password} = req.body
        const id = req.params.id

        const client = await Client.findByPk(id)
        
        if(client.user != user) {
            const userExist = await Client.findOne({where: {user: user}})

            if(userExist)
                return res.status(400).json({message: 'User already exists!'})
        }

        if(client.email != email) {
            const emailExist = await Client.findOne({where: {email: email}})

            if(emailExist)
                return res.status(400).json({message: 'E-mail already exists!'})
        }

        try {
            const client = {name, user, email, password}
            await Client.update(client, {where: {id: id}})
            res.status(201).json({message: 'Client updated successfully!'})     
        } catch (error) {
            res.status(500).json({message: error})   
        }
    }

    static async delete(req, res) {
        const id = req.params.id

        try {
            await Client.destroy({where: {id: id}}) 
            res.status(201).json({message: 'Client deleted successfully!'})  
        } catch (error) {
            res.status(500).json({message: error})    
        }
    }

    static async login(req, res) {
        const {user, password} = req.body
        
        if(!user)
            return res.status(400).json({message: 'User must be provided!'})

        if(!password)
            return res.status(400).json({message: 'Password must be provided!'})

        const clientExist = await Client.findOne({where: {user: user}})

        if(!clientExist)
            return res.status(400).json({message: 'User not found!'})
        else {
            if (clientExist.password != password)
                return res.status(400).json({message: 'Incorrect password!'})
        }

        await createTokenClient(clientExist, req, res)
    }

    static async addBalance(req, res) {
        const {balance} = req.body
        const id = req.params.id

        const clientE = await Client.findByPk(id)

        const currentbalance = parseFloat(balance) + parseFloat(clientE.balance)

        try {
            const client = {balance: currentbalance}
            console.log(currentbalance)
            await Client.update(client, {where: {id: id}})
            res.status(201).json({message: 'Balance added successfully!'}) 
        } catch (error) {
            res.status(500).json({message: 'Erro' + error})     
        }
    }

    static async getById(req, res) {
        const id = req.params.id
        
        const clientExist = await Client.findByPk(id, {attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})

        if(!clientExist)
            return res.status(400).json({message: 'Client not found!'})    

        res.status(201).json({client: clientExist})
    }

    static async getAll(req, res) {
        const clients =  await Client.findAll({attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})

        if(clients.length === 0)
            return res.status(400).json({message: 'There are no customers in the base'}) 

        res.status(201).json({clients: clients})
    }
}