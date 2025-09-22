const { STRING, UUIDV4, ENUM } = require("sequelize")
const sequelize = require("../../config/database")
const bcrypt = require("bcrypt")
const saltRounds = parseInt(process.env.SALTROUNDS)

const AdminModel = sequelize.define("admin", {
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
  // role: {
  //   type: STRING,
  //   allowNull: true
  // }
  role: {
    type: ENUM("admin", "operator"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["admin", "operator"]],
        msg: "Role hanya boleh admin atau operator"
      }
    }
  }
}, {
  freezeTableName: true,
  hooks: {
    beforeCreate(admin) {
      admin.password = bcrypt.hashSync(admin.password, saltRounds)
    }
  }
})

module.exports = AdminModel