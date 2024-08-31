const { DataTypes } = require('sequelize')
const conn = require('../db/Connection')

const Client = conn.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
    },
    user: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(30)
    },
    password: {
        type: DataTypes.STRING(20)
    },
    balance: {
        type: DataTypes.DECIMAL(10,2),
    },
    brttPoints: {
        type: DataTypes.DECIMAL(10,2),
    }
}, {freezeTableName: true, timestamps: true})

module.exports = Client