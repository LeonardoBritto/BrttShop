const { DataTypes } = require('sequelize')
const conn = require('../db/Connection')

const Game = conn.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
    },
    price: {
        type: DataTypes.DECIMAL(10,2)
    },
    plataform: {
        type: DataTypes.STRING(30)
    },
    category: {
        type: DataTypes.STRING(20)
    }
}, {freezeTableName: true, timestamps: true})

module.exports = Game