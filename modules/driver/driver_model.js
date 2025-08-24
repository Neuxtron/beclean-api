const { STRING, UUIDV4 } = require("sequelize")
const sequelize = require("../../config/database")

const DriverModel = sequelize.define("driver", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: STRING,
    allowNull: false,
  },
  noHp: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
})

module.exports = DriverModel