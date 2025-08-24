const { STRING, UUIDV4, ENUM, FLOAT } = require("sequelize")
const sequelize = require("../../config/database")
const UserModel = require("../user/user_model")

const MutasiModel = sequelize.define("mutasi", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  idUser: {
    type: STRING,
    allowNull: false,
  },
  status: {
    type: ENUM("pending", "proses", "selesai"),
    allowNull: false,
    defaultValue: "pending"
  },
  judul: {
    type: STRING,
    allowNull: false,
  },
  jumlah: {
    type: FLOAT,
    allowNull: false,
  },
}, {
  freezeTableName: true,
})

MutasiModel.belongsTo(UserModel, { as: "user", foreignKey: "idUser", onDelete: "RESTRICT" })

module.exports = MutasiModel