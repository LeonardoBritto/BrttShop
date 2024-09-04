const { DataTypes } = require('sequelize')
const conn = require('../db/Connection')

const Client = require('./Client')

const Sale = conn.define("Sale", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalSale: {
        type: DataTypes.DECIMAL(10,2)
    },
    discount: {
        type: DataTypes.DECIMAL(5,2)
    },    
    totalPaid: {
        type: DataTypes.DECIMAL(10,2)
    }
}, {freezeTableName: true, timestamps: true, createdAt: 'saleDate'})

Sale.belongsTo(Client, {foreignKey: 'clientId'})
Client.hasMany(Sale, {foreignKey: 'clientId'})

module.exports = Sale