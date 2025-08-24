const { STRING, UUIDV4, INTEGER, DOUBLE } = require("sequelize")
const sequelize = require("../../config/database")
const bcrypt = require("bcrypt")
const saltRounds = parseInt(process.env.SALTROUNDS)

const UserModel = sequelize.define("user", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: STRING,
    allowNull: false,
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
  token: {
    type: STRING,
    allowNull: true,
  },
  saldo: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  alamat: {
    type: STRING,
    allowNull: false,
  },
  latitude: {
    type: DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DOUBLE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  hooks: {
    beforeCreate(user) {
      user.password = bcrypt.hashSync(user.password, saltRounds)
    }
  }
})

module.exports = UserModel