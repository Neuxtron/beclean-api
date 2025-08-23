const { Sequelize } = require('sequelize')

const db = new Sequelize("beclean", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
})

module.exports = db