const { DataTypes } = require('sequelize')
const conn = require('../db/Connection')

const Sale = require('./Sale')
const Game = require('./Game')

const Detail = conn.define("Detail", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.DECIMAL(10,2)
    },   
    total: {
        type: DataTypes.DECIMAL(10,2)
    }
}, {freezeTableName: true, timestamps: false})

Detail.belongsTo(Sale, {foreignKey: 'saleId'})
Sale.hasMany(Detail, {foreignKey: 'saleId'})

Detail.belongsTo(Game, {foreignKey: 'gameId'})
Game.hasMany(Detail, {foreignKey: 'gameId'})

module.exports = Detail