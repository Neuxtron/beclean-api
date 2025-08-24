const { STRING, UUIDV4 } = require("sequelize")
const sequelize = require("../../config/database")
const bcrypt = require("bcrypt")
const saltRounds = parseInt(process.env.SALTROUNDS)

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
  hooks: {
    beforeCreate(driver) {
      driver.password = bcrypt.hashSync(driver.password, saltRounds)
    }
  }
})

module.exports = DriverModel