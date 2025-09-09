const { STRING, UUIDV4, DATE } = require("sequelize")
const sequelize = require("../../config/database")
const UserModel = require("../user/user_model")
const DriverModel = require("../driver/driver_model")
const DetailJadwalModel = require("../detail_jadwal/detail_jadwal_model")

const JadwalJemputModel = sequelize.define("jadwal_jemput", {
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
  idDriver: {
    type: STRING,
    allowNull: false,
  },
  jadwal: {
    type: DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
})

// JadwalJemputModel.belongsTo(UserModel, { as: "user", foreignKey: "idUser", onDelete: "CASCADE" })
// JadwalJemputModel.belongsTo(DriverModel, { as: "driver", foreignKey: "idDriver", onDelete: "RESTRICT" })
// JadwalJemputModel.hasMany(DetailJadwalModel, { as: "detail_jadwal", foreignKey: "idJadwalJemput", onDelete: "RESTRICT" })

module.exports = JadwalJemputModel